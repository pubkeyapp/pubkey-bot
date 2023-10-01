import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@pubkey-bot/api/core/data-access'
import { ApiNetworkAdminService } from './api-network-admin.service'

import { ApiNetworkService } from './api-network.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiNetworkService, ApiNetworkAdminService],
  exports: [ApiNetworkService],
})
export class ApiNetworkDataAccessModule {}
