import { Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { IdentityProvider } from '@prisma/client'
import { Identity } from '@pubkey-bot/api/identity/data-access'

@Resolver(() => Identity)
export class ApiIdentityFieldResolver {
  @ResolveField(() => Boolean, { nullable: true })
  expired(@Parent() identity: Identity) {
    if (identity.provider !== IdentityProvider.Discord) return false

    return !(identity.accessToken && identity.refreshToken)
  }

  @ResolveField(() => String, { nullable: true })
  name(@Parent() identity: Identity) {
    return identity.name ?? identity?.providerId
  }
}
