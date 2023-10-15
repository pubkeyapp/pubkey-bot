import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AdminUpdateCollectionInput {
  @Field({ nullable: true })
  name?: string
  @Field({ nullable: true })
  description?: string
  @Field({ nullable: true })
  symbol?: string
  @Field({ nullable: true })
  imageUrl?: string
  @Field({ nullable: true })
  metadataUrl?: string
}
