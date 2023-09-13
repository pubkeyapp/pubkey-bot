import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphQLAdminGuard } from '@pubkey-bot/api/auth/data-access'
import { ApiBotService, DiscordServer } from '@pubkey-bot/api/bot/data-access'

@Resolver()
@UseGuards(ApiAuthGraphQLAdminGuard)
export class ApiBotManagerResolver {
  constructor(private readonly service: ApiBotService) {}

  @Query(() => [DiscordServer], { nullable: true })
  managerGetBotServers(@Args('botId') botId: string) {
    return this.service.manager.getBotServers(botId)
  }

  @Query(() => DiscordServer, { nullable: true })
  managerGetBotServer(@Args('botId') botId: string, @Args('serverId') serverId: string) {
    return this.service.manager.getBotServer(botId, serverId)
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
