import { Field, InputType } from '@nestjs/graphql'
import { NetworkType } from '@pubkey-bot/api/network/data-access'

@InputType()
export class AdminCreateCollectionInput {
  @Field()
  name!: string
  @Field()
  account!: string
  @Field(() => NetworkType)
  network!: NetworkType
}
