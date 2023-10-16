import { Injectable } from '@nestjs/common'
import { ApiCollectionAdminService } from './api-collection-admin.service'
import { ApiCollectionUserService } from './api-collection-user.service'

@Injectable()
export class ApiCollectionService {
  constructor(readonly admin: ApiCollectionAdminService, readonly user: ApiCollectionUserService) {}
}
