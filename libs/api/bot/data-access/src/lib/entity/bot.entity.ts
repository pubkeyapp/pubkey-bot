import { Field, ObjectType } from '@nestjs/graphql'
import { BotApplication } from '@pubkey-bot/api/bot/util'
import { GraphQLJSON } from 'graphql-scalars'
import { BotStatus } from './bot-status.enum'

@ObjectType()
export class Bot {
  @Field(() => GraphQLJSON, { nullable: true })
  application?: BotApplication | null
  @Field({ nullable: true })
  avatarUrl?: string | null
  @Field()
  id!: string
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date
  @Field()
  name!: string
  @Field(() => BotStatus, { nullable: true })
  status!: BotStatus
}
