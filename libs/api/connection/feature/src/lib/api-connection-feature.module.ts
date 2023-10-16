import { Module } from '@nestjs/common'
import { ApiConnectionDataAccessModule } from '@pubkey-bot/api/connection/data-access'
import { ApiConnectionAdminResolver } from './api-connection-admin.resolver'

@Module({
  imports: [ApiConnectionDataAccessModule],
  providers: [ApiConnectionAdminResolver],
})
export class ApiConnectionFeatureModule {}
