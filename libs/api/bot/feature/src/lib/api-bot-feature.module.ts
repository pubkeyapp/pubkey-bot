import { Module } from '@nestjs/common'
import { ApiBotDataAccessModule } from '@pubkey-bot/api/bot/data-access'
import { ApiBotAdminResolver } from './api-bot-admin.resolver'
import { ApiBotFieldResolver } from './api-bot-field.resolver'
import { ApiBotManagerResolver } from './api-bot-manager.resolver'
import { ApiBotUserResolver } from './api-bot-user.resolver'
import { ApiBotController } from './api-bot.controller'

@Module({
  controllers: [ApiBotController],
  imports: [ApiBotDataAccessModule],
  providers: [ApiBotAdminResolver, ApiBotFieldResolver, ApiBotManagerResolver, ApiBotUserResolver],
})
export class ApiBotFeatureModule {}
