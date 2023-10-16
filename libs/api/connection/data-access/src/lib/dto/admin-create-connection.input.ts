import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AdminCreateConnectionInput {
  @Field()
  botId!: string
  @Field()
  collectionId!: string
  @Field()
  key!: string
}
