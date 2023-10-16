import { Field, ObjectType } from '@nestjs/graphql'
import { Collection } from '@pubkey-bot/api/collection/data-access'

@ObjectType()
export class Connection {
  @Field()
  id!: string
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date
  @Field()
  botId!: string
  @Field()
  collectionId!: string
  @Field(() => Collection, { nullable: true })
  collection?: Collection
  @Field()
  key!: string
}
