import { Module } from '@nestjs/common'
import { ApiAuthFeatureModule } from '@pubkey-bot/api/auth/feature'
import { ApiBotFeatureModule } from '@pubkey-bot/api/bot/feature'
import { ApiCollectionFeatureModule } from '@pubkey-bot/api/collection/feature'
import { ApiCoreDataAccessModule } from '@pubkey-bot/api/core/data-access'
import { ApiEmailFeatureModule } from '@pubkey-bot/api/email/feature'
import { ApiIdentityFeatureModule } from '@pubkey-bot/api/identity/feature'
import { ApiNetworkFeatureModule } from '@pubkey-bot/api/network/feature'
import { ApiUserFeatureModule } from '@pubkey-bot/api/user/feature'
import { ApiCoreController } from './api-core.controller'
import { ApiCoreResolver } from './api-core.resolver'

const imports = [
  ApiAuthFeatureModule,
  ApiBotFeatureModule,
  ApiCollectionFeatureModule,
  ApiCoreDataAccessModule,
  ApiEmailFeatureModule,
  ApiIdentityFeatureModule,
  ApiNetworkFeatureModule,
  ApiUserFeatureModule,
]

@Module({
  controllers: [ApiCoreController],
  imports: [...imports],
  providers: [ApiCoreResolver],
})
export class ApiCoreFeatureModule {}
