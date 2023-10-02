import { Field, ObjectType } from '@nestjs/graphql'
import { RESTDiscordRoleConnection } from '@pubkey-bot/api/bot/util'
import {
  convertDiscordRoleConnectionTypeToNumber,
  convertNumberToDiscordRoleConnectionType,
  DiscordRoleConnectionType,
} from './discord-role-connection-type.enum'

@ObjectType()
export class DiscordRoleConnection {
  @Field()
  key!: string
  @Field()
  name!: string
  @Field()
  description!: string
  @Field(() => DiscordRoleConnectionType)
  type!: DiscordRoleConnectionType
}

export function convertFromRESTDiscordRoleConnection(role: RESTDiscordRoleConnection): DiscordRoleConnection {
  return {
    key: role.key,
    name: role.name,
    description: role.description,
    type: convertNumberToDiscordRoleConnectionType(role.type),
  }
}

export function convertToRESTDiscordRoleConnection(role: DiscordRoleConnection): RESTDiscordRoleConnection {
  return {
    key: role.key,
    name: role.name,
    description: role.description,
    type: convertDiscordRoleConnectionTypeToNumber(role.type),
  }
}
