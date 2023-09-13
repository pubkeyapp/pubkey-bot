import { REST } from '@discordjs/rest'
import { Logger } from '@nestjs/common'
import { Client } from 'discord.js'
import { createDiscordClient } from './discord/client'

export class DiscordBot {
  private readonly logger = new Logger(DiscordBot.name)
  client?: Client
  rest?: REST
  constructor(private readonly token: string) {}

  async start() {
    this.logger.verbose(`Starting bot...`)
    this.client = await createDiscordClient(this.token)
    this.rest = new REST({ version: '10' }).setToken(this.token)
    this.logger.verbose(`Bot started`)
  }

  async stop() {
    this.logger.verbose(`Stopping bot...`)
    await this.client?.destroy()
    this.logger.verbose(`Bot stopped`)
  }
}
