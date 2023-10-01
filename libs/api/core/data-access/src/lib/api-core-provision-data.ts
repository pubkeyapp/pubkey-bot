import { faker } from '@faker-js/faker'
import { IdentityProvider, NetworkType, Prisma, UserRole, UserStatus } from '@prisma/client'
export const provisionNetworks: Prisma.NetworkCreateInput[] = [
  {
    id: 'solana-devnet',
    name: 'Solana Devnet',
    type: NetworkType.SolanaDevnet,
    endpoint: `https://solana-devnet.pubkey.network`,
  },
  {
    id: 'solana-mainnet',
    name: 'Solana Mainnet',
    type: NetworkType.SolanaMainnet,
    endpoint: `https://solana-mainnet.pubkey.network`,
  },
]

export const provisionUsers: Prisma.UserCreateInput[] = [
  {
    username: 'alice',
    password: 'password',
    role: UserRole.Admin,
    developer: true,
    identities: {
      create: [{ provider: IdentityProvider.Solana, providerId: 'ALiC98dw6j47Skrxje3zBN4jTA11w67JRjQRBeZH3BRG' }],
    },
  },
  {
    username: 'bob',
    password: 'password',
    role: UserRole.User,
  },
  // Charlie is a user with no password, so they can only log in with an external provider
  {
    username: 'charlie',
    role: UserRole.User,
  },
  // Dave is set to inactive, so they can't log in
  {
    username: 'dave',
    password: 'password',
    role: UserRole.User,
    status: UserStatus.Inactive,
  },
]

export function fakeUsers(count: number): Prisma.UserCreateInput[] {
  return Array.from({ length: count }, (_, index) => fakeUser(index))
}

export function fakeUser(index: number): Prisma.UserCreateInput {
  faker.seed(index)
  const username = faker.internet.userName()
  const password = faker.internet.password()
  const email = faker.internet.email()
  const avatarUrl = faker.internet.avatar()
  const name = faker.internet.displayName()

  return {
    avatarUrl,
    emails: { create: { email } },
    name,
    password,
    role: UserRole.User,
    status: UserStatus.Active,
    username,
  }
}
