import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AdminUpdateConnectionInput {
  @Field({ nullable: true })
  key?: string
}
