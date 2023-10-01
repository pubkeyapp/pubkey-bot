import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AdminUpdateNetworkInput {
  @Field({ nullable: true })
  name?: string
}
