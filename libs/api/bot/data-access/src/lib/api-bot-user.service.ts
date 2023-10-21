import { Injectable, Logger } from '@nestjs/common'
import { IdentityProvider } from '@prisma/client'
import { Collection, CollectionAsset } from '@pubkey-bot/api/collection/data-access'
import { ApiCoreService } from '@pubkey-bot/api/core/data-access'
import { ApiNetworkService } from '@pubkey-bot/api/network/data-access'
import { REST } from 'discord.js'
import { DAS } from 'helius-sdk'
import { LRUCache } from 'lru-cache'
import { ApiBotManagerService } from './api-bot-manager.service'
import { Bot } from './entity/bot.entity'

type VaultAssets = { account: string; assets: DAS.GetAssetResponse[] }

@Injectable()
export class ApiBotUserService {
  private readonly collectionAssetCache = new LRUCache<string, CollectionAsset[]>({
    max: 100,
    ttl: 1000 * 60 * 60,
  })
  private readonly vaultCache = new LRUCache<string, VaultAssets[]>({
    max: 100,
    ttl: 1000 * 60 * 60,
  })

  private readonly logger = new Logger(ApiBotUserService.name)

  constructor(
    private readonly core: ApiCoreService,
    private readonly manager: ApiBotManagerService,
    private readonly network: ApiNetworkService,
  ) {}

  async findOneBot(userId: string, botId: string): Promise<Bot> {
    const userDiscordIdentity = await this.core.data.identity.findFirst({
      where: { provider: IdentityProvider.Discord, ownerId: userId },
    })
    if (!userDiscordIdentity) {
      throw new Error('User has no discord identity')
    }

    const bot = await this.core.data.bot.findUnique({ where: { id: botId } })
    if (!bot) {
      throw new Error('Bot not found')
    }
    const instance = this.manager.getBotInstance(botId, {
      throwIfNotStarted: false,
    })
    if (!instance) {
      return bot
    }

    const application = await instance.getApplication()

    return { ...bot, application }
  }

  async getBotRoleConnections(userId: string, botId: string) {
    const botRoleConnections = await this.manager.getBotRoleConnections(botId)
    const connections = await this.core.data.connection.findMany({
      where: { botId },
      include: { collection: true },
    })

    const metadata = await this.getUserBotRoleConnection(userId, botId)

    return botRoleConnections.map((connection) => {
      return {
        ...connection,
        collection: connections.find((c) => c.key === connection.key)?.collection,
        metadata: metadata.metadata[connection.key],
      }
    })
  }

  async getBotCollectionAssets(userId: string, botId: string): Promise<Collection[]> {
    const identities = await this.core.data.identity.findMany({
      where: { ownerId: userId, provider: IdentityProvider.Solana, verified: true },
    })
    if (!identities.length) {
      throw new Error('User has no verified solana identities')
    }
    const bot = await this.core.data.bot.findFirst({ where: { id: botId } })
    if (!bot) {
      throw new Error('Bot not found')
    }

    const connections = await this.core.data.connection.findMany({
      where: { botId },
      include: { collection: true },
    })

    const collections = connections.map((connection) => connection.collection)

    const assets: CollectionAsset[] = await this.getCachedAssets({
      identities,
      collections,
    })

    const result = connections.map((connection) => ({
      ...connection.collection,
      assets: assets?.filter((asset) => asset.collection === connection.collection.account),
    }))

    const summary: UserBotRoleConnectionMetadata = {}
    for (const connection of connections) {
      summary[connection.key] = assets
        ?.filter((asset) => asset.collection === connection.collection.account)
        .length?.toString()
    }
    const newSummary: UserBotRoleConnectionMetadata = {}

    let hasDifference = false
    const remoteSummary = await this.getUserBotRoleConnection(userId, botId)
    const remoteMetadata = remoteSummary.metadata ?? {}

    for (const key in summary) {
      if (summary[key] !== remoteMetadata[key]) {
        hasDifference = true
        newSummary[key] = summary[key].toString()
      }
    }

    if (Object.keys(newSummary).length > 0 && hasDifference) {
      const instance = await this.getUserInstance(userId)
      const updated = await instance.put(`/users/@me/applications/${botId}/role-connection`, {
        body: { platform_name: bot.name, metadata: { ...summary, ...newSummary } },
      })
      if (updated) {
        this.logger.verbose(`Updated user role connection for bot ${botId}`)
      } else {
        this.logger.error(`Failed to update user role connection for bot ${botId}`)
      }
    } else {
      this.logger.verbose(`No changes to user role connection for bot ${botId}`)
    }

    return result
  }

  private async getCachedAssets({
    identities,
    collections,
  }: {
    identities: { providerId: string; provider: IdentityProvider }[]
    collections: Collection[]
  }): Promise<CollectionAsset[]> {
    const key = `${identities.map((i) => i.providerId).join(',')}-${collections
      .map(({ account }) => account)
      .join(',')}`
    if (!this.collectionAssetCache.has(key)) {
      this.logger.verbose(`Fetching collection assets for ${key}`)
      const assets: CollectionAsset[] = []
      for (const identity of identities) {
        const collectionAssets = await this.network.getOwnedAndStakedAssets({
          ownerAccount: identity.providerId,
          collectionMap: {
            SolanaMainnet: collections.map(({ account, vaultId }) => ({
              account,
              vaultId: vaultId ? vaultId : undefined,
            })),
            SolanaDevnet: [],
          },
        })
        assets.push(...collectionAssets.SolanaMainnet)
      }
      if (assets.length) {
        this.collectionAssetCache.set(key, assets)
      }
    }
    return this.collectionAssetCache.get(key) ?? []
  }

  private async getUserInstance(userId: string) {
    const identity = await this.core.data.identity.findFirst({
      where: { provider: IdentityProvider.Discord },
    })
    if (!identity) {
      throw new Error('User has no discord identity')
    }

    if (!identity.accessToken) {
      throw new Error('User has no access token, please login again using Discord')
    }

    return new REST({ version: '10', authPrefix: 'Bearer' }).setToken(identity.accessToken)
  }

  private async getUserBotRoleConnection(userId: string, botId: string): Promise<UserBotRoleConnection> {
    const instance = await this.getUserInstance(userId)

    const res = await instance.get(`/users/@me/applications/${botId}/role-connection`)

    return res as UserBotRoleConnection
  }
}

export interface UserBotRoleConnectionMetadata {
  [collectionId: string]: string
}

export interface UserBotRoleConnection {
  platform_name: string
  platform_username: string
  metadata: UserBotRoleConnectionMetadata
}
