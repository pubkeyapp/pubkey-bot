import { Injectable } from '@nestjs/common'
import { ApiCoreService } from '@pubkey-bot/api/core/data-access'
import { ApiConnectionAdminService } from './api-connection-admin.service'

@Injectable()
export class ApiConnectionService {
  constructor(private readonly core: ApiCoreService, readonly admin: ApiConnectionAdminService) {}
}
