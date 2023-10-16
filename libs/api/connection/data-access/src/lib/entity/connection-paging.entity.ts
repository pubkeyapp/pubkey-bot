import { ObjectType } from '@nestjs/graphql'
import { PagingResponse } from '@pubkey-bot/api/core/data-access'
import { Connection } from './connection.entity'

@ObjectType()
export class ConnectionPaging extends PagingResponse<Connection>(Connection) {}
