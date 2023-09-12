import { Module } from '@nestjs/common'
import { ApiCoreFeatureModule } from '@pubkey-bot/api/core/feature'

@Module({
  imports: [ApiCoreFeatureModule],
})
export class AppModule {}
