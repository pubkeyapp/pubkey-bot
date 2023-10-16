import { Field, ObjectType } from '@nestjs/graphql'
import { NetworkType } from '@pubkey-bot/api/network/data-access'
import { CollectionAsset } from './collection-asset.entity'

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
  @Field({ nullable: true })
  description?: string | null
  @Field({ nullable: true })
  symbol?: string | null
  @Field({ nullable: true })
  imageUrl?: string | null
  @Field({ nullable: true })
  metadataUrl?: string | null
  @Field(() => [CollectionAsset], { nullable: true })
  assets?: CollectionAsset[] | null
}
