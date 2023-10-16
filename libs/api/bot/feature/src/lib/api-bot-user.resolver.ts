import { UseGuards } from '@nestjs/common'
import { Args, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphQLUserGuard, CtxUser } from '@pubkey-bot/api/auth/data-access'
import { ApiBotService, Bot, DiscordRoleConnection, DiscordServerRole } from '@pubkey-bot/api/bot/data-access'
import { Collection } from '@pubkey-bot/api/collection/data-access'
import { GraphQLJSON } from 'graphql-scalars'

@Resolver()
@UseGuards(ApiAuthGraphQLUserGuard)
export class ApiBotUserResolver {
  constructor(private readonly service: ApiBotService) {}

  @Query(() => Bot, { nullable: true })
  userFindOneBot(@CtxUser() user: { id: string }, @Args('botId') botId: string) {
    return this.service.user.findOneBot(user.id, botId)
  }

  @Query(() => [DiscordServerRole], { nullable: true })
  userGetBotRoles(@Args('botId') botId: string, @Args('serverId') serverId: string) {
    return this.service.manager.getBotRoles(botId, serverId)
  }

  @Query(() => [Collection], { nullable: true })
  userGetBotCollectionAssets(@CtxUser() user: { id: string }, @Args('botId') botId: string) {
    return this.service.user.getBotCollectionAssets(user.id, botId)
  }

  @Query(() => [DiscordRoleConnection], { nullable: true })
  userGetBotRoleConnections(@CtxUser() user: { id: string }, @Args('botId') botId: string) {
    return this.service.user.getBotRoleConnections(user.id, botId)
  }
}
