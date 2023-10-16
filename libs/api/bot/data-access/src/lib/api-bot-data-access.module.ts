import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@pubkey-bot/api/core/data-access'
import { ApiNetworkDataAccessModule } from '@pubkey-bot/api/network/data-access'
import { ApiBotAdminService } from './api-bot-admin.service'
import { ApiBotManagerService } from './api-bot-manager.service'
import { ApiBotUserService } from './api-bot-user.service'

import { ApiBotService } from './api-bot.service'

@Module({
  imports: [ApiCoreDataAccessModule, ApiNetworkDataAccessModule],
  providers: [ApiBotService, ApiBotAdminService, ApiBotManagerService, ApiBotUserService],
  exports: [ApiBotService],
})
export class ApiBotDataAccessModule {}
