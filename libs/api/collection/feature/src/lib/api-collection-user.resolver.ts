import { UseGuards } from '@nestjs/common'
import { Resolver } from '@nestjs/graphql'
import { ApiAuthGraphQLAdminGuard } from '@pubkey-bot/api/auth/data-access'
import { ApiCollectionService } from '@pubkey-bot/api/collection/data-access'

@Resolver()
@UseGuards(ApiAuthGraphQLAdminGuard)
export class ApiCollectionAdminResolver {
  constructor(private readonly service: ApiCollectionService) {}
}
