import { Controller, Get, Param } from '@nestjs/common'
import { ApiBotService } from '@pubkey-bot/api/bot/data-access'

@Controller('bot')
export class ApiBotController {
  constructor(private readonly service: ApiBotService) {}

  @Get(':botId')
  async getBot(@Param('botId') botId: string) {
    // const res = await this.service.findOne(botId)
    return {
      id: botId,
    }
  }
  @Get(':botId/callback')
  async oAuthCallback(@Param('botId') botId: string) {
    // const res = await this.service.findOne(botId)
    return {
      id: botId,
    }
  }
  @Get(':botId/verification')
  async roleVerification(@Param('botId') botId: string) {
    // const res = await this.service.findOne(botId)
    console.log(`roleVerification ${botId}`)
    return {
      id: botId,
    }
  }
}
