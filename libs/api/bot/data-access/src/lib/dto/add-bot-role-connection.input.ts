import { Field, InputType } from '@nestjs/graphql'
import { DiscordRoleConnectionType } from '../entity/discord-role-connection-type.enum'

@InputType()
export class AddBotRoleConnectionInput {
  @Field()
  key!: string
  @Field()
  name!: string
  @Field()
  description!: string
  @Field(() => DiscordRoleConnectionType)
  type!: DiscordRoleConnectionType
}
