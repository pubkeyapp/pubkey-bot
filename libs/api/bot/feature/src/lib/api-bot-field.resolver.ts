import { Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { ApiBotService, Bot } from '@pubkey-bot/api/bot/data-access'

@Resolver(() => Bot)
export class ApiBotFieldResolver {
  constructor(private readonly service: ApiBotService) {}

  @ResolveField(() => String)
  developersUrl(@Parent() bot: Bot) {
    return this.service.manager.developersUrl(bot.id)
  }

  @ResolveField(() => String)
  inviteUrl(@Parent() bot: Bot) {
    return this.service.manager.inviteUrl(bot.id)
  }

  @ResolveField(() => String)
  redirectUrl(@Parent() bot: Bot) {
    return this.service.manager.redirectUrl(bot.id)
  }

  @ResolveField(() => Boolean, { nullable: true })
  redirectUrlSet(@Parent() bot: Bot) {
    const url = this.service.manager.redirectUrl(bot.id)

    return bot.application?.redirect_uris?.includes(url)
  }

  @ResolveField(() => String)
  verificationUrl(@Parent() bot: Bot) {
    return this.service.manager.verificationUrl(bot.id)
  }

  @ResolveField(() => Boolean, { nullable: true })
  verificationUrlSet(@Parent() bot: Bot) {
    const url = this.service.manager.verificationUrl(bot.id)

    return url === bot.application?.role_connections_verification_url
  }

  @ResolveField(() => Boolean)
  started(@Parent() bot: Bot) {
    return this.service.manager.isStarted(bot.id)
  }
}
