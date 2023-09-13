import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@pubkey-bot/api/core/data-access'
import { ApiBotAdminService } from './api-bot-admin.service'
import { ApiBotManagerService } from './api-bot-manager.service'

import { ApiBotService } from './api-bot.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiBotService, ApiBotAdminService, ApiBotManagerService],
  exports: [ApiBotService],
})
export class ApiBotDataAccessModule {}
