import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AdminUpdateBotInput {
  @Field({ nullable: true })
  name?: string
}
