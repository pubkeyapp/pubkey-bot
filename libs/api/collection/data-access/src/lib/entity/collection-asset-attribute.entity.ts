import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class CollectionAssetAttribute {
  @Field({ nullable: true })
  id?: string
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date
  @Field()
  key!: string
  @Field()
  value!: string
  @Field(() => Int, { nullable: true })
  count?: number
}
