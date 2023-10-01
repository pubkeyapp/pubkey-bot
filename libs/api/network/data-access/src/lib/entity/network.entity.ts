import { Field, ObjectType } from '@nestjs/graphql'
import { NetworkType } from './network-type.enum'

@ObjectType()
export class Network {
  @Field()
  id!: string
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date
  @Field()
  name!: string
  @Field()
  endpoint!: string
  @Field(() => NetworkType)
  type!: NetworkType
}
