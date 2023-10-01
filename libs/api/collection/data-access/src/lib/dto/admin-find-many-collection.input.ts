import { Field, InputType, Int } from '@nestjs/graphql'
import { PagingInput } from '@pubkey-bot/api/core/data-access'

@InputType()
export class AdminFindManyCollectionInput extends PagingInput() {
  @Field({ nullable: true })
  search?: string
}
