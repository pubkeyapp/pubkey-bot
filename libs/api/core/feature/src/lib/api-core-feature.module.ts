import { Module } from '@nestjs/common'
import { ApiAuthFeatureModule } from '@pubkey-bot/api/auth/feature'
import { ApiCoreDataAccessModule } from '@pubkey-bot/api/core/data-access'
import { ApiEmailFeatureModule } from '@pubkey-bot/api/email/feature'
import { ApiIdentityFeatureModule } from '@pubkey-bot/api/identity/feature'
import { ApiUserFeatureModule } from '@pubkey-bot/api/user/feature'
import { ApiCoreController } from './api-core.controller'
import { ApiCoreResolver } from './api-core.resolver'
import { ApiBotFeatureModule } from '@pubkey-bot/api/bot/feature'

const imports = [
  ApiAuthFeatureModule,
  ApiCoreDataAccessModule,
  ApiEmailFeatureModule,
  ApiIdentityFeatureModule,
  ApiUserFeatureModule,
  ApiBotFeatureModule,
]

@Module({
  controllers: [ApiCoreController],
  imports: [...imports],
  providers: [ApiCoreResolver],
})
export class ApiCoreFeatureModule {}
