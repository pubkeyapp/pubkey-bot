import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { ApiCoreService } from '@pubkey-bot/api/core/data-access'
import { ApiBotAdminService } from './api-bot-admin.service'
import { ApiBotManagerService } from './api-bot-manager.service'

@Injectable()
export class ApiBotService implements OnModuleInit {
  private readonly logger = new Logger(ApiCoreService.name)
  constructor(
    private readonly core: ApiCoreService,
    readonly admin: ApiBotAdminService,
    readonly manager: ApiBotManagerService,
  ) {}

  async onModuleInit() {
    const bots = await this.core.data.bot.count()
    if (bots === 0) {
      const created = await this.admin.createBot({
        clientId: this.core.config.discordClientId,
        clientSecret: this.core.config.discordClientSecret,
        token: this.core.config.discordToken,
      })
      this.logger.log(`Created bot ${created.name}`)
      await this.manager.startBot(created.id)
    }
  }
}
