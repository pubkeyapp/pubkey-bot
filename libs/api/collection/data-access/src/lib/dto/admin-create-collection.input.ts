import { Field, InputType } from '@nestjs/graphql'
import { NetworkType } from '@pubkey-bot/api/network/data-access'

@InputType()
export class AdminCreateCollectionInput {
  @Field()
  account!: string
  @Field(() => NetworkType)
  network!: NetworkType
}
