import { Injectable } from '@nestjs/common'
import { ApiCoreService } from '@pubkey-bot/api/core/data-access'
import { ApiNetworkAdminService } from './api-network-admin.service'

@Injectable()
export class ApiNetworkService {
  constructor(private readonly core: ApiCoreService, readonly admin: ApiNetworkAdminService) {}
}
