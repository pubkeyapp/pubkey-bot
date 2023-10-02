import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphQLAdminGuard } from '@pubkey-bot/api/auth/data-access'
import { ApiBotService, DiscordRoleConnection, DiscordServer, DiscordServerRole } from '@pubkey-bot/api/bot/data-access'
import { GraphQLJSON } from 'graphql-scalars'
import { AddBotRoleConnectionInput } from '../../../data-access/src/lib/dto/add-bot-role-connection.input'

@Resolver()
@UseGuards(ApiAuthGraphQLAdminGuard)
export class ApiBotManagerResolver {
  constructor(private readonly service: ApiBotService) {}

  @Query(() => [DiscordServer], { nullable: true })
  managerGetBotServers(@Args('botId') botId: string) {
    return this.service.manager.getBotServers(botId)
  }

  @Query(() => [DiscordRoleConnection], { nullable: true })
  managerGetBotRoleConnections(@Args('botId') botId: string) {
    return this.service.manager.getBotRoleConnections(botId)
  }

  @Mutation(() => [DiscordRoleConnection], { nullable: true })
  managerRemoveBotRoleConnection(@Args('botId') botId: string, @Args('key') key: string) {
    return this.service.manager.removeBotRoleConnection(botId, key)
  }

  @Mutation(() => [DiscordRoleConnection], { nullable: true })
  managerAddBotRoleConnection(@Args('botId') botId: string, @Args('input') input: AddBotRoleConnectionInput) {
    return this.service.manager.addBotRoleConnection(botId, input)
  }

  @Query(() => DiscordServer, { nullable: true })
  managerGetBotServer(@Args('botId') botId: string, @Args('serverId') serverId: string) {
    return this.service.manager.getBotServer(botId, serverId)
  }

  @Query(() => [DiscordServerRole], { nullable: true })
  managerGetBotRoles(@Args('botId') botId: string, @Args('serverId') serverId: string) {
    return this.service.manager.getBotRoles(botId, serverId)
  }

  @Mutation(() => Boolean, { nullable: true })
  managerLeaveBotServer(@Args('botId') botId: string, @Args('serverId') serverId: string) {
    return this.service.manager.leaveBotServer(botId, serverId)
  }

  @Mutation(() => Boolean, { nullable: true })
  managerStartBot(@Args('botId') botId: string) {
    return this.service.manager.startBot(botId)
  }

  @Mutation(() => Boolean, { nullable: true })
  managerStopBot(@Args('botId') botId: string) {
    return this.service.manager.stopBot(botId)
  }
}
