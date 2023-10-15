import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@pubkey-bot/api/core/data-access'
import { ApiNetworkDataAccessModule } from '@pubkey-bot/api/network/data-access'
import { ApiCollectionAdminService } from './api-collection-admin.service'

import { ApiCollectionService } from './api-collection.service'

@Module({
  imports: [ApiCoreDataAccessModule, ApiNetworkDataAccessModule],
  providers: [ApiCollectionService, ApiCollectionAdminService],
  exports: [ApiCollectionService],
})
export class ApiCollectionDataAccessModule {}
