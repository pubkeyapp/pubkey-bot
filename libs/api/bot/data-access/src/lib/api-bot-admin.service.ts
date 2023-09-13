import { Injectable, Logger } from '@nestjs/common'
import { ApiCoreService } from '@pubkey-bot/api/core/data-access'
import { User } from 'discord.js'
import { ApiBotManagerService } from './api-bot-manager.service'
import { AdminCreateBotInput } from './dto/admin-create-bot.input'
import { AdminFindManyBotInput } from './dto/admin-find-many-bot.input'
import { AdminUpdateBotInput } from './dto/admin-update-bot.input'
import { BotPaging } from './entity/bot-paging.entity'
import { getAdminBotWhereInput } from './helpers/get-admin-bot-where.input'
import { Bot, BotApplication } from './entity/bot.entity'

@Injectable()
export class ApiBotAdminService {
  private readonly logger = new Logger(ApiBotAdminService.name)

  constructor(private readonly core: ApiCoreService, private readonly manager: ApiBotManagerService) {}

  async createBot(input: AdminCreateBotInput) {
    const user: User = await this.manager.getBotUser(input.token)
    this.logger.verbose(`Creating bot ${user.username}`)
    const avatarUrl = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=1024`
    return this.core.data.bot.create({
      data: {
        id: user.id,
        avatarUrl,
        name: user.username,
        ...input,
      },
    })
  }

  async deleteBot(botId: string) {
    const deleted = await this.core.data.bot.delete({ where: { id: botId } })
    return !!deleted
  }

  async findManyBot(input: AdminFindManyBotInput): Promise<BotPaging> {
    return this.core.data.bot
      .paginate({
        orderBy: { name: 'asc' },
        where: getAdminBotWhereInput(input),
      })
      .withPages({ limit: input.limit, page: input.page })
      .then(([data, meta]) => ({ data, meta }))
  }

  async findOneBot(botId: string): Promise<Bot> {
    const bot = await this.core.data.bot.findUnique({ where: { id: botId } })
    if (!bot) {
      throw new Error('Bot not found')
    }
    const instance = this.manager.getBotInstance(botId)
    if (!instance) {
      return bot
    }

    const application = (await instance.rest?.get(`/applications/${botId}`)) as BotApplication

    return { ...bot, application }
  }

  async updateBot(botId: string, input: AdminUpdateBotInput) {
    return this.core.data.bot.update({ where: { id: botId }, data: input })
  }
}
