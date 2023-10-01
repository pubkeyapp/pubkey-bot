import { Module } from '@nestjs/common'
import { ApiCollectionDataAccessModule } from '@pubkey-bot/api/collection/data-access'
import { ApiCollectionAdminResolver } from './api-collection-admin.resolver'

@Module({
  imports: [ApiCollectionDataAccessModule],
  providers: [ApiCollectionAdminResolver],
})
export class ApiCollectionFeatureModule {}
