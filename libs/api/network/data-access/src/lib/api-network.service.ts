import { Injectable } from '@nestjs/common'
import { NetworkType, Prisma } from '@prisma/client'
import { CollectionAsset } from '@pubkey-bot/api/collection/data-access'
import { ApiCoreService } from '@pubkey-bot/api/core/data-access'
import { getAttributeMap, HeliusClient } from '@pubkey-bot/api/network/util'
import { DAS } from 'helius-sdk'
import { ApiNetworkAdminService } from './api-network-admin.service'
import { convertNetworkType } from './helpers/convert-network-type'

@Injectable()
export class ApiNetworkService {
  private readonly clients = new Map<NetworkType, HeliusClient>()

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
