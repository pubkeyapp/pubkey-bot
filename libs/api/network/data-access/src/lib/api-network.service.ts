import { Injectable, Logger } from '@nestjs/common'
import { NetworkType, Prisma } from '@prisma/client'
import { CollectionAsset, CollectionMap, CollectionMapItem } from '@pubkey-bot/api/collection/data-access'
import { ApiCoreService } from '@pubkey-bot/api/core/data-access'
import { fetchStakedTokens, getAttributeMap, HeliusClient } from '@pubkey-bot/api/network/util'
import { DAS } from 'helius-sdk'
import { LRUCache } from 'lru-cache'
import { ApiNetworkAdminService } from './api-network-admin.service'
import { convertNetworkType } from './helpers/convert-network-type'
import { initializeNetworkAssetMap } from './helpers/initialize-network-asset-map'

type VaultAssets = { account: string; assets: DAS.GetAssetResponse[] }

@Injectable()
export class ApiNetworkService {
  private readonly logger = new Logger(ApiNetworkService.name)
  private readonly clients = new Map<NetworkType, HeliusClient>()
  private readonly vaultCache = new LRUCache<string, VaultAssets[]>({
    max: 100,
    ttl: 1000 * 60 * 60,
  })
  constructor(private readonly core: ApiCoreService, readonly admin: ApiNetworkAdminService) {}

  async getCollectionAssetsByOwner(network: NetworkType, ownerAccount: string, collectionAccounts: string[]) {
    const client = await this.ensureClient(network)

    const assets = await client.getCollectionAssetsByOwner({ ownerAccount, collectionAccounts })

    return assets.map((asset) => this.convertDasToAsset({ network, asset }))
  }

  private convertDasToAsset({
    network,
    asset,
  }: {
    network: NetworkType
    asset: DAS.GetAssetResponse
  }): CollectionAsset {
    const collectionAccount = asset.grouping?.find((g) => g.group_key === 'collection')?.group_value?.toString()

    if (!collectionAccount) {
      throw new Error(`Asset ${asset.id} has no collection`)
    }

    const { attributes, attributeMap } = getAttributeMap(asset.content?.metadata)

    return {
      network,
      account: asset.id,
      name: asset?.content?.metadata?.name ?? asset.id,
      metadata: asset.content?.metadata as unknown as Prisma.JsonObject,
      attributes: attributes,
      image: asset.content?.files?.[0]?.uri,
      attributeMap,
      owner: asset.ownership?.owner,
      collection: collectionAccount,
      raw: asset as unknown as Prisma.JsonObject,
    }
  }

  async getTokenMetadata(network: NetworkType, account: string) {
    const client = await this.ensureClient(network)

    return client.getTokenMetadata(account)
  }

  async getOwnedAndStakedAssets({
    collectionMap,
    ownerAccount,
  }: {
    collectionMap: CollectionMap
    ownerAccount: string
  }): Promise<Record<NetworkType, CollectionAsset[]>> {
    const networks = Object.keys(collectionMap) as NetworkType[]
    const assets = initializeNetworkAssetMap(networks)
    const [owned, staked] = await Promise.all([
      this.getOwnedAssets({ collectionMap, ownerAccount }),
      this.getStakedAssets({ collectionMap, ownerAccount }),
    ])

    for (const network of networks) {
      assets[network] = [...(owned[network] ?? []), ...(staked[network] ?? [])]
    }

    return assets
  }

  async getOwnedAssets({
    collectionMap,
    ownerAccount,
  }: {
    collectionMap: CollectionMap
    ownerAccount: string
  }): Promise<Record<NetworkType, CollectionAsset[]>> {
    const tag = `getOwnedAssets ${ownerAccount} ->`
    const networks = Object.keys(collectionMap) as NetworkType[]
    const assets = initializeNetworkAssetMap(networks)

    this.logger.verbose(`${tag} Getting assets...`)

    for (const network of networks) {
      const collectionAccounts = collectionMap[network].map((c) => c.account)
      assets[network] = await this.getCollectionAccounts(network, { ownerAccount, collectionAccounts })
    }

    return assets
  }

  private async getCollectionAccounts(
    network: NetworkType,
    {
      ownerAccount,
      collectionAccounts,
    }: {
      collectionAccounts: string[]
      ownerAccount: string
    },
  ): Promise<CollectionAsset[]> {
    const tag = `getCollectionAccounts ${network} ${ownerAccount} ->`
    const client = await this.ensureClient(network)

    const filtered = await client.getCollectionAssetsByOwner({ ownerAccount, collectionAccounts })

    if (!filtered.length) {
      return []
    }

    this.logger.verbose(`${tag} Filtered to ${filtered.length} assets for ${network} -> ${ownerAccount}`)
    return filtered.map((asset) => this.convertDasToAsset({ network, asset }))
  }

  async getStakedAssets({
    collectionMap,
    ownerAccount,
  }: {
    collectionMap: CollectionMap
    ownerAccount: string
  }): Promise<Record<NetworkType, CollectionAsset[]>> {
    const tag = `getStakedAssets ${ownerAccount} ->`

    // We only support staked assets on Solana Mainnet
    if (!collectionMap[NetworkType.SolanaMainnet]) {
      this.logger.verbose(`${tag} No Solana Mainnet collections found, skipping`)
      return {
        [NetworkType.SolanaDevnet]: [],
        [NetworkType.SolanaMainnet]: [],
      }
    }
    const stakedCollectionMap = { [NetworkType.SolanaMainnet]: collectionMap[NetworkType.SolanaMainnet] }
    const networks = Object.keys(stakedCollectionMap) as NetworkType[]
    const assets = initializeNetworkAssetMap(networks)

    // Get all assets from the collection vaults
    const collectionVaultAssets: Record<string, VaultAssets[]> = await this.getCollectionVaults(
      collectionMap[NetworkType.SolanaMainnet].filter((c) => !!c.vaultId),
    )

    // Find the assets from the vault for this owner
    const vaultAssetsOwner: VaultAssets[] = []
    for (const vaultAssets of Object.values(collectionVaultAssets)) {
      const owned = vaultAssets.find((v) => v.account === ownerAccount)
      if (owned) {
        vaultAssetsOwner.push(owned)
      }
    }

    if (!vaultAssetsOwner || !vaultAssetsOwner?.length) {
      this.logger.verbose(`${tag} Account ${ownerAccount} has no assets found in any vaults`)
      return assets
    }

    this.logger.verbose(`${tag} Found ${vaultAssetsOwner.length} vaults for ${ownerAccount}, getting assets...`)
    const collectionAccounts = stakedCollectionMap['SolanaMainnet'].map((c) => c.account)
    assets['SolanaMainnet'] = await this.getStakedAccounts(
      'SolanaMainnet',
      vaultAssetsOwner.map((v) => v.assets).flat(),
      {
        ownerAccount,
        collectionAccounts,
      },
    )

    return assets
  }

  private async getStakedAccounts(
    network: NetworkType,
    assets: DAS.GetAssetResponse[],
    {
      ownerAccount,
      collectionAccounts,
    }: {
      collectionAccounts: string[]
      ownerAccount: string
    },
  ): Promise<CollectionAsset[]> {
    const tag = `getStakedAccounts ${network} ${ownerAccount} ->`
    const filtered = assets.filter(
      (asset) =>
        !!asset.grouping?.find((g) => g.group_key === 'collection' && collectionAccounts.includes(g.group_value)),
    )

    if (!filtered.length) {
      this.logger.verbose(`${tag} No assets found for ${network} -> ${ownerAccount}`)
      return []
    }

    this.logger.verbose(`${tag} Filtered to ${filtered.length} assets for ${network} -> ${ownerAccount}`)
    return filtered.map((asset) => this.convertDasToAsset({ network, asset }))
  }

  async getCollectionVaults(items: CollectionMapItem[]): Promise<Record<string, VaultAssets[]>> {
    const vaults: Record<string, VaultAssets[]> = {}
    for (const item of items) {
      if (!item.vaultId) {
        continue
      }
      const vaultAssets = await this.getVaultAssets(item.vaultId)
      if (!vaultAssets?.length) {
        this.logger.verbose(`getCollectionVaults: No vaults found for ${item.vaultId}`)
        continue
      }
      vaults[item.account] = vaultAssets
    }
    return vaults
  }

  async getVaultAssets(vaultId: string) {
    if (!this.vaultCache.has(vaultId)) {
      const client = await this.ensureClient('SolanaMainnet')
      this.logger.verbose(`getVaultAssets: Fetching vault ${vaultId}...`)
      const result = await fetchStakedTokens(vaultId)
        .then(async (res) => {
          // Fetch assets for all staked mints
          const data = await client.getAssets(res.map((item) => item.mints).flat())
          // Map staked mints back to their owners
          return res.map((item) => ({
            account: item.account,
            assets: data.filter((asset: { id: string }) => item.mints.includes(asset.id)),
          }))
        })
        .catch((err) => {
          console.log(`Error fetching vault ${vaultId}`, err)
        })
      if (!result) {
        this.logger.warn(`getVaultAssets: Vault ${vaultId} not found`)
        return
      }
      this.vaultCache.set(vaultId, result)
    }
    return this.vaultCache.get(vaultId)
  }

  private async ensureClient(network: NetworkType) {
    const client = await this.getClient(network)

    if (!client) {
      throw new Error(`Client for network ${network} not found`)
    }
    return client
  }

  private async getClient(type: NetworkType) {
    if (!this.clients.has(type)) {
      const network = await this.core.data.network.findUnique({ where: { type } })
      if (!network) {
        throw new Error(`Network ${type} not found`)
      }
      const client = new HeliusClient({
        apiKey: this.core.config.heliusApiKey as string,
        cluster: convertNetworkType(type),
      })
      this.clients.set(type, client)
    }
    return this.clients.get(type)
  }
}
