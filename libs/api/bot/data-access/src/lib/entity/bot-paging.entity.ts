import { ObjectType } from '@nestjs/graphql'
import { PagingResponse } from '@pubkey-bot/api/core/data-access'
import { Bot } from './bot.entity'

@ObjectType()
export class BotPaging extends PagingResponse<Bot>(Bot) {}
