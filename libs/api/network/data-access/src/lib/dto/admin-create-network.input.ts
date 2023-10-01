import { Field, InputType } from '@nestjs/graphql'
import { NetworkType } from '../entity/network-type.enum'

@InputType()
export class AdminCreateNetworkInput {
  @Field()
  name!: string
  @Field()
  endpoint!: string
  @Field(() => NetworkType)
  type!: NetworkType
}
