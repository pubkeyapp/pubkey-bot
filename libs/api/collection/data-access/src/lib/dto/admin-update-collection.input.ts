import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AdminUpdateCollectionInput {
  @Field({ nullable: true })
  name?: string
}
