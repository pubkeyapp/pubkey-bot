import { Injectable } from '@nestjs/common'
import { NetworkType } from '@prisma/client'
import { ApiCoreService } from '@pubkey-bot/api/core/data-access'
import { HeliusClient } from '@pubkey-bot/api/network/util'
import { ApiNetworkAdminService } from './api-network-admin.service'
import { convertNetworkType } from './helpers/convert-network-type'

@Injectable()
export class ApiNetworkService {
  private readonly clients = new Map<NetworkType, HeliusClient>()

  constructor(private readonly core: ApiCoreService, readonly admin: ApiNetworkAdminService) {}

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
