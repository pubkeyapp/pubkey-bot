import { Injectable } from '@nestjs/common'
import { ApiCoreService } from '@pubkey-bot/api/core/data-access'
import { ApiCollectionAdminService } from './api-collection-admin.service'

@Injectable()
export class ApiCollectionService {
  constructor(private readonly core: ApiCoreService, readonly admin: ApiCollectionAdminService) {}
}
