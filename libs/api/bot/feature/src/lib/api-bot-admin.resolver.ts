import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphQLAdminGuard } from '@pubkey-bot/api/auth/data-access'
import {
  AdminCreateBotInput,
  AdminFindManyBotInput,
  AdminUpdateBotInput,
  ApiBotService,
  Bot,
  BotPaging,
} from '@pubkey-bot/api/bot/data-access'

@Resolver()
@UseGuards(ApiAuthGraphQLAdminGuard)
export class ApiBotAdminResolver {
  constructor(private readonly service: ApiBotService) {}

  @Mutation(() => Bot, { nullable: true })
  adminCreateBot(@Args('input') input: AdminCreateBotInput) {
    return this.service.admin.createBot(input)
  }

  @Mutation(() => Boolean, { nullable: true })
  adminDeleteBot(@Args('botId') botId: string) {
    return this.service.admin.deleteBot(botId)
  }

  @Query(() => BotPaging, { nullable: true })
  adminFindManyBot(@Args('input') input: AdminFindManyBotInput) {
    return this.service.admin.findManyBot(input)
  }

  @Query(() => Bot, { nullable: true })
  adminFindOneBot(@Args('botId') botId: string) {
    return this.service.admin.findOneBot(botId)
  }

  @Mutation(() => Bot, { nullable: true })
  adminUpdateBot(@Args('botId') botId: string, @Args('input') input: AdminUpdateBotInput) {
    return this.service.admin.updateBot(botId, input)
  }
}
