import { Field, InputType } from '@nestjs/graphql'
import { PagingInput } from '@pubkey-bot/api/core/data-access'

@InputType()
export class AdminFindManyConnectionInput extends PagingInput() {
  @Field()
  botId!: string
}
