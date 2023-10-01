import { Module } from '@nestjs/common'
import { ApiNetworkDataAccessModule } from '@pubkey-bot/api/network/data-access'
import { ApiNetworkAdminResolver } from './api-network-admin.resolver'

@Module({
  imports: [ApiNetworkDataAccessModule],
  providers: [ApiNetworkAdminResolver],
})
export class ApiNetworkFeatureModule {}
