import { Injectable } from '@nestjs/common'
import { ApiCoreService } from '@pubkey-bot/api/core/data-access'
import { AdminCreateCollectionInput } from './dto/admin-create-collection.input'
import { AdminFindManyCollectionInput } from './dto/admin-find-many-collection.input'
import { AdminUpdateCollectionInput } from './dto/admin-update-collection.input'
import { CollectionPaging } from './entity/collection-paging.entity'
import { getAdminCollectionWhereInput } from './helpers/get-admin-collection-where.input'

@Injectable()
export class ApiCollectionAdminService {
  constructor(private readonly core: ApiCoreService) {}

  async createCollection(input: AdminCreateCollectionInput) {
    return this.core.data.collection.create({ data: input })
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
