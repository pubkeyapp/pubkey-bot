import { Injectable, Logger } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { IdentityProvider, Prisma, User, UserRole, UserStatus } from '@prisma/client'
import { ApiCoreService, AppContext, hashPassword, slugifyId, validatePassword } from '@pubkey-bot/api/core/data-access'
import { Request } from 'express'
import { LoginInput } from './dto/login.input'
import { RegisterInput } from './dto/register.input'

export interface AuthRequest extends Request {
  user?: User
}

@Injectable()
export class ApiAuthService {
  private readonly logger = new Logger(ApiAuthService.name)
  constructor(readonly core: ApiCoreService, private readonly jwt: JwtService) {}

  async login(context: AppContext, input: LoginInput) {
    if (!this.core.config.authPasswordEnabled) {
      throw new Error(`Login with username and password is not allowed.`)
    }
    if (input?.password.length < 8) {
      throw new Error('Password is too short.')
    }
    const user = await this.validateUser(input)
    const token = this.sign({ username: user.username, id: user.id })
    this.setCookie(context, token)

    return user
  }

  logout(context: AppContext) {
    this.resetCookie(context)
    return Promise.resolve(true)
  }

  async register(context: AppContext, input: RegisterInput) {
    if (!this.core.config.authRegisterEnabled) {
      throw new Error(`Registration is disabled.`)
    }
    if (input?.password.length < 8) {
      throw new Error('Password is too short.')
    }
    const username = slugifyId(input.username)
    const exists = await this.core.data.user.findUnique({ where: { username } })
    if (exists) {
      throw new Error('User already exists.')
    }
    const user = await this.core.data.user.create({
      data: {
        username,
        password: hashPassword(input.password),
        status: UserStatus.Created,
      },
    })

    const token = this.sign({ username: user.username, id: user.id })
    this.setCookie(context, token)

    return user
  }

  async findUsername(username: string): Promise<string> {
    username = slugifyId(username)
    const exists = await this.core.data.user.findUnique({ where: { username } })
    if (!exists) {
      return username
    }
    const newUsername = `${username}-${Math.floor(Math.random() * 1000)}`
    return this.findUsername(newUsername)
  }

  async createUserWithIdentity(identity: Prisma.IdentityCreateWithoutOwnerInput) {
    const username = await this.findUsername((identity.profile as { username: string }).username ?? identity.providerId)
    const admin = this.core.config.discordAdminIds?.includes(identity.providerId)

    const user = await this.core.data.user.create({
      data: {
        username,
        status: UserStatus.Active,
        avatarUrl: (identity.profile as { avatarUrl?: string })?.avatarUrl,
        role: admin ? UserRole.Admin : UserRole.User,
        developer: admin,
        identities: {
          create: {
            ...identity,
          },
        },
      },
    })
    this.logger.verbose(
      `Created user ${username} (${user.id}) with identity ${identity.providerId} (${identity.provider})`,
    )

    return user
  }

  private async validateUser({ username, password }: LoginInput) {
    const user = await this.core.data.user.findUnique({ where: { username } })
    if (!user) {
      throw new Error('User not found.')
    }
    if (!user.password) {
      throw new Error('Login with username and password is not allowed.')
    }
    if (user.status === UserStatus.Inactive) {
      throw new Error('User is inactive.')
    }
    if (!validatePassword(password, user.password)) {
      throw new Error('Password is incorrect.')
    }
    user.password = null
    return user
  }

  private resetCookie(context: AppContext) {
    return context.res.clearCookie(this.core.config.cookieName, this.core.config.cookieOptions(context.req.hostname))
  }

  private setCookie(context: AppContext, token: string) {
    return context.res?.cookie(this.core.config.cookieName, token, this.core.config.cookieOptions(context.req.hostname))
  }

  async setUserCookie(context: AppContext) {
    if (!context.req.user) {
      throw new Error('No user found.')
    }
    const { username, id } = context.req.user as User
    const token = this.sign({ username, id })
    this.setCookie(context, token)
    return context.res?.cookie(this.core.config.cookieName, token, this.core.config.cookieOptions(context.req.hostname))
  }

  private sign(payload: { id: string; username: string }): string {
    return this.jwt.sign(payload)
  }

  async findUserByIdentity({ provider, providerId }: { provider: IdentityProvider; providerId: string }) {
    return this.core.data.identity.findUnique({
      where: { provider_providerId: { provider, providerId } },
      include: { owner: true },
    })
  }
}
