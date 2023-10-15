import { Injectable, Logger } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { ApiCoreService } from '@pubkey-bot/api/core/data-access'
import { ApiNetworkService } from '@pubkey-bot/api/network/data-access'
import { AdminCreateCollectionInput } from './dto/admin-create-collection.input'
import { AdminFindManyCollectionInput } from './dto/admin-find-many-collection.input'
import { AdminUpdateCollectionInput } from './dto/admin-update-collection.input'
import { CollectionPaging } from './entity/collection-paging.entity'
import { getAdminCollectionWhereInput } from './helpers/get-admin-collection-where.input'

@Injectable()
export class ApiCollectionAdminService {
  private readonly logger = new Logger(ApiCollectionAdminService.name)
  constructor(private readonly core: ApiCoreService, private readonly network: ApiNetworkService) {}

  async createCollection(input: AdminCreateCollectionInput) {
    const found = await this.core.data.collection.findUnique({
      where: {
        account_network: { account: input.account, network: input.network },
      },
    })
    if (found) {
      throw new Error(`Collection ${input.network} => ${input.account} already exists`)
    }

    const tokenMetadata = await this.network.getTokenMetadata(input.network, input.account)
    if (!tokenMetadata?.length || !tokenMetadata[0]?.offChainMetadata?.metadata) {
      throw new Error(`Collection ${input.network} => ${input.account} not found`)
    }

    const offChainMetadata = tokenMetadata[0]?.offChainMetadata
    const metadata = offChainMetadata?.metadata

    const data: Prisma.CollectionCreateInput = {
      ...input,
      description: metadata.description,
      imageUrl: metadata.image,
      metadataUrl: offChainMetadata.uri,
      name: metadata.name,
      symbol: metadata.symbol,
    }

    const created = await this.core.data.collection.create({ data })
    if (!created) {
      throw new Error(`Collection ${input.network} => ${input.account} not created`)
    } else {
      this.logger.verbose(`Collection ${input.network} => ${input.account} created`)
    }
    return created
  }

  async deleteCollection(collectionId: string) {
    const deleted = await this.core.data.collection.delete({ where: { id: collectionId } })
    return !!deleted
  }

  async findManyCollection(input: AdminFindManyCollectionInput): Promise<CollectionPaging> {
    return this.core.data.collection
      .paginate({
        orderBy: { name: 'asc' },
        where: getAdminCollectionWhereInput(input),
      })
      .withPages({ limit: input.limit, page: input.page })
      .then(([data, meta]) => ({ data, meta }))
  }

  async findOneCollection(collectionId: string) {
    return this.core.data.collection.findUnique({ where: { id: collectionId } })
  }

  async updateCollection(collectionId: string, input: AdminUpdateCollectionInput) {
    return this.core.data.collection.update({ where: { id: collectionId }, data: input })
  }
}
