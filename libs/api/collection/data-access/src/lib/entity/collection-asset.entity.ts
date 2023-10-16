import { Field, HideField, ObjectType } from '@nestjs/graphql'
import { NetworkType, Prisma } from '@prisma/client'
import { GraphQLJSON } from 'graphql-scalars'
import { CollectionAssetAttribute } from './collection-asset-attribute.entity'

@ObjectType()
export class CollectionAsset {
  @Field({ nullable: true })
  id?: string
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date
  @Field({ nullable: true })
  account!: string
  @Field(() => [CollectionAssetAttribute], { nullable: true })
  attributes?: Prisma.JsonValue | null
  @Field(() => GraphQLJSON, { nullable: true })
  attributeMap?: unknown | null
  @Field()
  name!: string
  @Field(() => NetworkType, { nullable: true })
  network!: NetworkType
  @Field({ nullable: true })
  image?: string | null
  @Field(() => GraphQLJSON, { nullable: true })
  metadata?: unknown
  @Field({ nullable: true })
  owner?: string
  @Field(() => GraphQLJSON, { nullable: true })
  raw?: unknown
  @Field({ nullable: true })
  symbol?: string | null
  @HideField()
  collection?: unknown
  @HideField()
  identity?: unknown
}
