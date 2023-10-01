import { Field, ObjectType } from '@nestjs/graphql'
import { NetworkType } from '@pubkey-bot/api/network/data-access'

@ObjectType()
export class Collection {
  @Field()
  id!: string
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date
  @Field()
  account!: string
  @Field(() => NetworkType)
  network!: NetworkType
  @Field({ nullable: true })
  name?: string | null
}