import { Injectable } from '@nestjs/common'
import { ApiCoreService } from '@pubkey-bot/api/core/data-access'
import { AdminCreateConnectionInput } from './dto/admin-create-connection.input'
import { AdminFindManyConnectionInput } from './dto/admin-find-many-connection.input'
import { AdminUpdateConnectionInput } from './dto/admin-update-connection.input'
import { ConnectionPaging } from './entity/connection-paging.entity'
import { getAdminConnectionWhereInput } from './helpers/get-admin-connection-where.input'

@Injectable()
export class ApiConnectionAdminService {
  constructor(private readonly core: ApiCoreService) {}

  async createConnection(input: AdminCreateConnectionInput) {
    return this.core.data.connection.create({ data: input })
  }

  async deleteConnection(connectionId: string) {
    const deleted = await this.core.data.connection.delete({ where: { id: connectionId } })
    return !!deleted
  }

  async findManyConnection(input: AdminFindManyConnectionInput): Promise<ConnectionPaging> {
    return this.core.data.connection
      .paginate({
        orderBy: { key: 'asc' },
        where: getAdminConnectionWhereInput(input),
        include: { collection: true },
      })
      .withPages({ limit: input.limit, page: input.page })
      .then(([data, meta]) => ({ data, meta }))
  }

  async findOneConnection(connectionId: string) {
    return this.core.data.connection.findUnique({ where: { id: connectionId } })
  }

  async updateConnection(connectionId: string, input: AdminUpdateConnectionInput) {
    return this.core.data.connection.update({ where: { id: connectionId }, data: input })
  }
}
