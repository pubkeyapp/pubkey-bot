import { Injectable, Logger } from '@nestjs/common'
import { Identity as PrismaIdentity, IdentityProvider } from '@prisma/client'
import { ApiCoreService, BaseContext, getRequestDetails } from '@pubkey-bot/api/core/data-access'
import { verifySignature } from '@pubkeyapp/solana-verify-wallet'
import { PublicKey } from '@solana/web3.js'
import { LinkIdentityInput } from './dto/link-identity-input'
import { RequestIdentityChallengeInput } from './dto/request-identity-challenge.input'
import { VerifyIdentityChallengeInput } from './dto/verify-identity-challenge-input'
import { sha256 } from './helpers/sha256'

@Injectable()
export class ApiIdentityUserService {
  private readonly logger = new Logger(ApiIdentityUserService.name)
  constructor(private readonly core: ApiCoreService) {}

  async deleteIdentity(userId: string, identityId: string): Promise<boolean> {
    const found = await this.core.data.identity.findFirst({ where: { id: identityId, ownerId: userId } })
    if (!found) {
      throw new Error(`Identity ${identityId} not found`)
    }
    await this.core.data.identityChallenge.deleteMany({ where: { identity: { id: identityId } } })
    const deleted = await this.core.data.identity.delete({ where: { id: identityId } })
    if (!deleted) {
      throw new Error(`Identity ${identityId} not deleted`)
    }
    return true
  }

  async findManyIdentity(userId: string): Promise<PrismaIdentity[]> {
    const items = await this.core.data.identity.findMany({
      where: { ownerId: userId },
      orderBy: [{ provider: 'asc' }, { providerId: 'asc' }],
    })
    if (!items) {
      return []
    }
    return items
  }

  async requestIdentityChallenge(
    ctx: BaseContext,
    userId: string,
    { provider, providerId }: RequestIdentityChallengeInput,
  ) {
    // Make sure we can link the given provider
    this.ensureLinkProvider(provider)
    // Make sure the providerId is valid
    this.ensureValidProviderId(provider, providerId)
    // Make sure the identity is owned by the user
    await this.ensureIdentityOwner(userId, provider, providerId)

    // Get the IP and user agent from the request
    const { ip, userAgent } = getRequestDetails(ctx)

    // Generate a random challenge
    const challenge = sha256(`${Math.random()}-${ip}-${userAgent}-${userId}-${provider}-${providerId}-${Math.random()}`)

    // Store the challenge
    return this.core.data.identityChallenge.create({
      data: {
        identity: { connect: { provider_providerId: { provider, providerId } } },
        ip,
        userAgent,
        challenge: `Approve this message to verify your wallet. #REF-${challenge}`,
      },
    })
  }

  async verifyIdentityChallenge(
    ctx: BaseContext,
    userId: string,
    { provider, providerId, challenge, signature, useLedger }: VerifyIdentityChallengeInput,
  ) {
    // Make sure we can link the given provider
    this.ensureLinkProvider(provider)
    // Make sure the providerId is valid
    this.ensureValidProviderId(provider, providerId)
    // Make sure the identity is owned by the user
    await this.ensureIdentityOwner(userId, provider, providerId)

    // Make sure we find the challenge
    const found = await this.core.data.identityChallenge.findFirst({
      where: {
        provider,
        providerId,
        challenge,
      },
      include: {
        identity: true,
      },
    })

    if (!found) {
      throw new Error(`Identity challenge not found.`)
    }

    const { ip, userAgent } = getRequestDetails(ctx)

    if (found.ip !== ip || found.userAgent !== userAgent) {
      throw new Error(`Identity challenge not found.`)
    }

    const verified = verifySignature({
      challenge: found.challenge,
      publicKey: found.identity.providerId,
      signature,
      useLedger,
    })

    if (!verified) {
      throw new Error(`Identity challenge verification failed.`)
    }

    if (!found.identity.verified) {
      // Update the identity
      await this.core.data.identity.update({
        where: { id: found.identity.id },
        data: { verified: true },
      })
      this.logger.log(`Identity ${found.identity.id} verified`)
    }

    // Update the identity
    const updated = await this.core.data.identityChallenge.update({
      where: {
        id: found.id,
      },
      data: {
        verified,
        signature,
      },
    })
    return updated
  }

  private ensureLinkProvider(provider: IdentityProvider) {
    if (provider !== IdentityProvider.Solana) {
      throw new Error(`Identity provider ${provider} not supported`)
    }
  }

  private ensureValidProviderId(provider: IdentityProvider, providerId: string) {
    if (provider === IdentityProvider.Solana) {
      verifyValidPublicKey(providerId)
    }
  }

  private async ensureIdentityOwner(ownerId: string, provider: IdentityProvider, providerId: string) {
    const found = await this.core.data.identity.findFirst({
      where: {
        ownerId,
        provider,
        providerId,
      },
    })
    if (!found) {
      throw new Error(`Identity ${provider} ${providerId} not found`)
    }
    return found
  }

  async linkIdentity(userId: string, { provider, providerId }: LinkIdentityInput) {
    // Make sure we can link the given provider
    this.ensureLinkProvider(provider)
    // Make sure the identity does not exist
    const found = await this.core.data.identity.findFirst({
      where: {
        provider,
        providerId,
      },
    })
    if (found) {
      throw new Error(`Identity ${provider} ${providerId} already linked`)
    }

    // Create the identity
    const created = await this.core.data.identity.create({
      data: {
        provider,
        providerId,
        ownerId: userId,
      },
    })
    return created
  }
}

function verifyValidPublicKey(address: string) {
  try {
    new PublicKey(address)
  } catch (error) {
    throw new Error(`Invalid Solana public key.`)
  }
}
