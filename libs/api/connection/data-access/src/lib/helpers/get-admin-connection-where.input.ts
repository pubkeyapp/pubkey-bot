import { Prisma } from '@prisma/client'
import { AdminFindManyConnectionInput } from '../dto/admin-find-many-connection.input'

export function getAdminConnectionWhereInput(input: AdminFindManyConnectionInput): Prisma.ConnectionWhereInput {
  return {
    botId: input.botId,
  }
}
