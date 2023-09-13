import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AdminCreateBotInput {
  @Field()
  clientId!: string
  @Field()
  clientSecret!: string
  @Field()
  token!: string
}
