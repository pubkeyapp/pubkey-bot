import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class DiscordServer {
  @Field()
  id!: string
  @Field()
  name!: string
  @Field({ nullable: true })
  icon?: string | null
  @Field(() => [String], { nullable: true })
  permissions?: string[] | null
}
