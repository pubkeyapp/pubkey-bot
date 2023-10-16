import { Injectable, Logger } from '@nestjs/common'
import { ApiCoreService } from '@pubkey-bot/api/core/data-access'
import { ApiNetworkService } from '@pubkey-bot/api/network/data-access'

@Injectable()
export class ApiCollectionUserService {
  private readonly logger = new Logger(ApiCollectionUserService.name)
  constructor(private readonly core: ApiCoreService, private readonly network: ApiNetworkService) {}
}
