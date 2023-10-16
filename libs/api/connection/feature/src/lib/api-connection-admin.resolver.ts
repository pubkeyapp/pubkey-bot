import { Resolver } from '@nestjs/graphql'
import { ApiConnectionService } from '@pubkey-bot/api/connection/data-access'
import { ApiAuthGraphQLAdminGuard } from '@pubkey-bot/api/auth/data-access'
import { Mutation, Query, Args } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateConnectionInput,
  AdminFindManyConnectionInput,
  Connection,
  ConnectionPaging,
  AdminUpdateConnectionInput,
} from '@pubkey-bot/api/connection/data-access'

@Resolver()
@UseGuards(ApiAuthGraphQLAdminGuard)
export class ApiConnectionAdminResolver {
  constructor(private readonly service: ApiConnectionService) {}

  @Mutation(() => Connection, { nullable: true })
  adminCreateConnection(@Args('input') input: AdminCreateConnectionInput) {
    return this.service.admin.createConnection(input)
  }

  @Mutation(() => Boolean, { nullable: true })
  adminDeleteConnection(@Args('connectionId') connectionId: string) {
    return this.service.admin.deleteConnection(connectionId)
  }

  @Query(() => ConnectionPaging, { nullable: true })
  adminFindManyConnection(@Args('input') input: AdminFindManyConnectionInput) {
    return this.service.admin.findManyConnection(input)
  }

  @Query(() => Connection, { nullable: true })
  adminFindOneConnection(@Args('connectionId') connectionId: string) {
    return this.service.admin.findOneConnection(connectionId)
  }

  @Mutation(() => Connection, { nullable: true })
  adminUpdateConnection(@Args('connectionId') connectionId: string, @Args('input') input: AdminUpdateConnectionInput) {
    return this.service.admin.updateConnection(connectionId, input)
  }
}
