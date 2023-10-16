import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@pubkey-bot/api/core/data-access'
import { ApiConnectionAdminService } from './api-connection-admin.service'

import { ApiConnectionService } from './api-connection.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiConnectionService, ApiConnectionAdminService],
  exports: [ApiConnectionService],
})
export class ApiConnectionDataAccessModule {}
