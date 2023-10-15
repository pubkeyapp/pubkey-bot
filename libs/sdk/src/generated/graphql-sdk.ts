// @ts-nocheck
import { GraphQLClient } from 'graphql-request'
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types'
import { print } from 'graphql'
import gql from 'graphql-tag'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never }
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: Date; output: Date }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any }
}

export type AddBotRoleConnectionInput = {
  description: Scalars['String']['input']
  key: Scalars['String']['input']
  name: Scalars['String']['input']
  type: DiscordRoleConnectionType
}

export type AdminCreateBotInput = {
  clientId: Scalars['String']['input']
  clientSecret: Scalars['String']['input']
  token: Scalars['String']['input']
}

export type AdminCreateCollectionInput = {
  account: Scalars['String']['input']
  network: NetworkType
}

export type AdminCreateEmailInput = {
  email: Scalars['String']['input']
  ownerId: Scalars['String']['input']
}

export type AdminCreateIdentityInput = {
  ownerId: Scalars['String']['input']
  provider: IdentityProvider
  providerId: Scalars['String']['input']
}

export type AdminCreateNetworkInput = {
  endpoint: Scalars['String']['input']
  name: Scalars['String']['input']
  type: NetworkType
}

export type AdminCreateUserInput = {
  password?: InputMaybe<Scalars['String']['input']>
  username: Scalars['String']['input']
}

export type AdminFindManyBotInput = {
  limit?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  search?: InputMaybe<Scalars['String']['input']>
}

export type AdminFindManyCollectionInput = {
  limit?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  search?: InputMaybe<Scalars['String']['input']>
}

export type AdminFindManyEmailInput = {
  ownerId: Scalars['String']['input']
}

export type AdminFindManyIdentityInput = {
  ownerId?: InputMaybe<Scalars['String']['input']>
  provider?: InputMaybe<IdentityProvider>
}

export type AdminFindManyNetworkInput = {
  limit?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  search?: InputMaybe<Scalars['String']['input']>
}

export type AdminFindManyUserInput = {
  limit?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  role?: InputMaybe<UserRole>
  search?: InputMaybe<Scalars['String']['input']>
  status?: InputMaybe<UserStatus>
}

export type AdminUpdateBotInput = {
  name?: InputMaybe<Scalars['String']['input']>
}

export type AdminUpdateCollectionInput = {
  description?: InputMaybe<Scalars['String']['input']>
  imageUrl?: InputMaybe<Scalars['String']['input']>
  metadataUrl?: InputMaybe<Scalars['String']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  symbol?: InputMaybe<Scalars['String']['input']>
}

export type AdminUpdateEmailInput = {
  default?: InputMaybe<Scalars['Boolean']['input']>
  email?: InputMaybe<Scalars['String']['input']>
  private?: InputMaybe<Scalars['Boolean']['input']>
  verified?: InputMaybe<Scalars['Boolean']['input']>
}

export type AdminUpdateNetworkInput = {
  name?: InputMaybe<Scalars['String']['input']>
}

export type AdminUpdateUserInput = {
  avatarUrl?: InputMaybe<Scalars['String']['input']>
  developer?: InputMaybe<Scalars['Boolean']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  role?: InputMaybe<UserRole>
  status?: InputMaybe<UserStatus>
  username?: InputMaybe<Scalars['String']['input']>
}

export type AppConfig = {
  __typename?: 'AppConfig'
  authDiscordEnabled: Scalars['Boolean']['output']
  authPasswordEnabled: Scalars['Boolean']['output']
  authRegisterEnabled: Scalars['Boolean']['output']
}

export type Bot = {
  __typename?: 'Bot'
  application?: Maybe<Scalars['JSON']['output']>
  avatarUrl?: Maybe<Scalars['String']['output']>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  developersUrl: Scalars['String']['output']
  id: Scalars['String']['output']
  inviteUrl: Scalars['String']['output']
  name: Scalars['String']['output']
  redirectUrl: Scalars['String']['output']
  redirectUrlSet?: Maybe<Scalars['Boolean']['output']>
  started: Scalars['Boolean']['output']
  status?: Maybe<BotStatus>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
  verificationUrl: Scalars['String']['output']
  verificationUrlSet?: Maybe<Scalars['Boolean']['output']>
}

export type BotPaging = {
  __typename?: 'BotPaging'
  data: Array<Bot>
  meta: PagingMeta
}

export enum BotStatus {
  Active = 'Active',
  Inactive = 'Inactive',
}

export type Collection = {
  __typename?: 'Collection'
  account: Scalars['String']['output']
  createdAt?: Maybe<Scalars['DateTime']['output']>
  description?: Maybe<Scalars['String']['output']>
  id: Scalars['String']['output']
  imageUrl?: Maybe<Scalars['String']['output']>
  metadataUrl?: Maybe<Scalars['String']['output']>
  name?: Maybe<Scalars['String']['output']>
  network: NetworkType
  symbol?: Maybe<Scalars['String']['output']>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
}

export type CollectionPaging = {
  __typename?: 'CollectionPaging'
  data: Array<Collection>
  meta: PagingMeta
}

export type DiscordRoleConnection = {
  __typename?: 'DiscordRoleConnection'
  description: Scalars['String']['output']
  key: Scalars['String']['output']
  name: Scalars['String']['output']
  type: DiscordRoleConnectionType
}

export enum DiscordRoleConnectionType {
  BooleanEqual = 'booleanEqual',
  BooleanNotEqual = 'booleanNotEqual',
  DateTimeGreaterThanOrEqual = 'dateTimeGreaterThanOrEqual',
  DateTimeLessThanOrEqual = 'dateTimeLessThanOrEqual',
  IntegerEqual = 'integerEqual',
  IntegerGreaterThanOrEqual = 'integerGreaterThanOrEqual',
  IntegerLessThanOrEqual = 'integerLessThanOrEqual',
  IntegerNotEqual = 'integerNotEqual',
}

export type DiscordServer = {
  __typename?: 'DiscordServer'
  icon?: Maybe<Scalars['String']['output']>
  id: Scalars['String']['output']
  name: Scalars['String']['output']
  permissions?: Maybe<Array<Scalars['String']['output']>>
}

export type DiscordServerRole = {
  __typename?: 'DiscordServerRole'
  color: Scalars['Int']['output']
  id: Scalars['String']['output']
  managed: Scalars['Boolean']['output']
  name: Scalars['String']['output']
  position: Scalars['Int']['output']
}

export type Email = {
  __typename?: 'Email'
  createdAt: Scalars['DateTime']['output']
  default?: Maybe<Scalars['Boolean']['output']>
  email: Scalars['String']['output']
  id: Scalars['String']['output']
  private?: Maybe<Scalars['Boolean']['output']>
  updatedAt: Scalars['DateTime']['output']
  verified?: Maybe<Scalars['Boolean']['output']>
}

export type Identity = {
  __typename?: 'Identity'
  challenges?: Maybe<Array<IdentityChallenge>>
  createdAt: Scalars['DateTime']['output']
  expired?: Maybe<Scalars['Boolean']['output']>
  id: Scalars['String']['output']
  name?: Maybe<Scalars['String']['output']>
  owner?: Maybe<User>
  profile?: Maybe<Scalars['JSON']['output']>
  provider: IdentityProvider
  providerId: Scalars['String']['output']
  updatedAt: Scalars['DateTime']['output']
  verified?: Maybe<Scalars['Boolean']['output']>
}

export type IdentityChallenge = {
  __typename?: 'IdentityChallenge'
  challenge: Scalars['String']['output']
  createdAt: Scalars['DateTime']['output']
  id: Scalars['String']['output']
  ip: Scalars['String']['output']
  provider: IdentityProvider
  providerId: Scalars['String']['output']
  signature?: Maybe<Scalars['String']['output']>
  updatedAt: Scalars['DateTime']['output']
  userAgent: Scalars['String']['output']
  verified: Scalars['Boolean']['output']
}

export enum IdentityProvider {
  Discord = 'Discord',
  Solana = 'Solana',
}

export type LinkIdentityInput = {
  provider: IdentityProvider
  providerId: Scalars['String']['input']
}

export type LoginInput = {
  password: Scalars['String']['input']
  username: Scalars['String']['input']
}

export type Mutation = {
  __typename?: 'Mutation'
  adminCreateBot?: Maybe<Bot>
  adminCreateCollection?: Maybe<Collection>
  adminCreateEmail?: Maybe<Email>
  adminCreateIdentity?: Maybe<Identity>
  adminCreateNetwork?: Maybe<Network>
  adminCreateUser?: Maybe<User>
  adminDeleteBot?: Maybe<Scalars['Boolean']['output']>
  adminDeleteCollection?: Maybe<Scalars['Boolean']['output']>
  adminDeleteEmail?: Maybe<Scalars['Boolean']['output']>
  adminDeleteIdentity?: Maybe<Scalars['Boolean']['output']>
  adminDeleteNetwork?: Maybe<Scalars['Boolean']['output']>
  adminDeleteUser?: Maybe<Scalars['Boolean']['output']>
  adminUpdateBot?: Maybe<Bot>
  adminUpdateCollection?: Maybe<Collection>
  adminUpdateEmail?: Maybe<Email>
  adminUpdateNetwork?: Maybe<Network>
  adminUpdateUser?: Maybe<User>
  login?: Maybe<User>
  logout?: Maybe<Scalars['Boolean']['output']>
  managerAddBotRoleConnection?: Maybe<Array<DiscordRoleConnection>>
  managerLeaveBotServer?: Maybe<Scalars['Boolean']['output']>
  managerRemoveBotRoleConnection?: Maybe<Array<DiscordRoleConnection>>
  managerStartBot?: Maybe<Scalars['Boolean']['output']>
  managerStopBot?: Maybe<Scalars['Boolean']['output']>
  register?: Maybe<User>
  userDeleteIdentity?: Maybe<Scalars['Boolean']['output']>
  userLinkIdentity?: Maybe<Identity>
  userUpdateUser?: Maybe<User>
  userVerifyIdentityChallenge?: Maybe<IdentityChallenge>
}

export type MutationAdminCreateBotArgs = {
  input: AdminCreateBotInput
}

export type MutationAdminCreateCollectionArgs = {
  input: AdminCreateCollectionInput
}

export type MutationAdminCreateEmailArgs = {
  input: AdminCreateEmailInput
}

export type MutationAdminCreateIdentityArgs = {
  input: AdminCreateIdentityInput
}

export type MutationAdminCreateNetworkArgs = {
  input: AdminCreateNetworkInput
}

export type MutationAdminCreateUserArgs = {
  input: AdminCreateUserInput
}

export type MutationAdminDeleteBotArgs = {
  botId: Scalars['String']['input']
}

export type MutationAdminDeleteCollectionArgs = {
  collectionId: Scalars['String']['input']
}

export type MutationAdminDeleteEmailArgs = {
  emailId: Scalars['String']['input']
}

export type MutationAdminDeleteIdentityArgs = {
  identityId: Scalars['String']['input']
}

export type MutationAdminDeleteNetworkArgs = {
  networkId: Scalars['String']['input']
}

export type MutationAdminDeleteUserArgs = {
  userId: Scalars['String']['input']
}

export type MutationAdminUpdateBotArgs = {
  botId: Scalars['String']['input']
  input: AdminUpdateBotInput
}

export type MutationAdminUpdateCollectionArgs = {
  collectionId: Scalars['String']['input']
  input: AdminUpdateCollectionInput
}

export type MutationAdminUpdateEmailArgs = {
  emailId: Scalars['String']['input']
  input: AdminUpdateEmailInput
}

export type MutationAdminUpdateNetworkArgs = {
  input: AdminUpdateNetworkInput
  networkId: Scalars['String']['input']
}

export type MutationAdminUpdateUserArgs = {
  input: AdminUpdateUserInput
  userId: Scalars['String']['input']
}

export type MutationLoginArgs = {
  input: LoginInput
}

export type MutationManagerAddBotRoleConnectionArgs = {
  botId: Scalars['String']['input']
  input: AddBotRoleConnectionInput
}

export type MutationManagerLeaveBotServerArgs = {
  botId: Scalars['String']['input']
  serverId: Scalars['String']['input']
}

export type MutationManagerRemoveBotRoleConnectionArgs = {
  botId: Scalars['String']['input']
  key: Scalars['String']['input']
}

export type MutationManagerStartBotArgs = {
  botId: Scalars['String']['input']
}

export type MutationManagerStopBotArgs = {
  botId: Scalars['String']['input']
}

export type MutationRegisterArgs = {
  input: RegisterInput
}

export type MutationUserDeleteIdentityArgs = {
  identityId: Scalars['String']['input']
}

export type MutationUserLinkIdentityArgs = {
  input: LinkIdentityInput
}

export type MutationUserUpdateUserArgs = {
  input: UserUpdateUserInput
}

export type MutationUserVerifyIdentityChallengeArgs = {
  input: VerifyIdentityChallengeInput
}

export type Network = {
  __typename?: 'Network'
  createdAt?: Maybe<Scalars['DateTime']['output']>
  endpoint: Scalars['String']['output']
  id: Scalars['String']['output']
  name: Scalars['String']['output']
  type: NetworkType
  updatedAt?: Maybe<Scalars['DateTime']['output']>
}

export type NetworkPaging = {
  __typename?: 'NetworkPaging'
  data: Array<Network>
  meta: PagingMeta
}

export enum NetworkType {
  SolanaDevnet = 'SolanaDevnet',
  SolanaMainnet = 'SolanaMainnet',
}

export type PagingMeta = {
  __typename?: 'PagingMeta'
  currentPage: Scalars['Int']['output']
  isFirstPage: Scalars['Boolean']['output']
  isLastPage: Scalars['Boolean']['output']
  nextPage?: Maybe<Scalars['Int']['output']>
  pageCount?: Maybe<Scalars['Int']['output']>
  previousPage?: Maybe<Scalars['Int']['output']>
  totalCount?: Maybe<Scalars['Int']['output']>
}

export type Query = {
  __typename?: 'Query'
  adminFindManyBot?: Maybe<BotPaging>
  adminFindManyCollection?: Maybe<CollectionPaging>
  adminFindManyEmail?: Maybe<Array<Email>>
  adminFindManyIdentity?: Maybe<Array<Identity>>
  adminFindManyNetwork?: Maybe<NetworkPaging>
  adminFindManyUser?: Maybe<UserPaging>
  adminFindOneBot?: Maybe<Bot>
  adminFindOneCollection?: Maybe<Collection>
  adminFindOneNetwork?: Maybe<Network>
  adminFindOneUser?: Maybe<User>
  appConfig: AppConfig
  managerGetBotRoleConnections?: Maybe<Array<DiscordRoleConnection>>
  managerGetBotRoles?: Maybe<Array<DiscordServerRole>>
  managerGetBotServer?: Maybe<DiscordServer>
  managerGetBotServers?: Maybe<Array<DiscordServer>>
  me?: Maybe<User>
  uptime: Scalars['Float']['output']
  userFindManyIdentity?: Maybe<Array<Identity>>
  userFindManyUser?: Maybe<UserPaging>
  userFindOneUser?: Maybe<User>
  userRequestIdentityChallenge?: Maybe<IdentityChallenge>
}

export type QueryAdminFindManyBotArgs = {
  input: AdminFindManyBotInput
}

export type QueryAdminFindManyCollectionArgs = {
  input: AdminFindManyCollectionInput
}

export type QueryAdminFindManyEmailArgs = {
  input: AdminFindManyEmailInput
}

export type QueryAdminFindManyIdentityArgs = {
  input: AdminFindManyIdentityInput
}

export type QueryAdminFindManyNetworkArgs = {
  input: AdminFindManyNetworkInput
}

export type QueryAdminFindManyUserArgs = {
  input: AdminFindManyUserInput
}

export type QueryAdminFindOneBotArgs = {
  botId: Scalars['String']['input']
}

export type QueryAdminFindOneCollectionArgs = {
  collectionId: Scalars['String']['input']
}

export type QueryAdminFindOneNetworkArgs = {
  networkId: Scalars['String']['input']
}

export type QueryAdminFindOneUserArgs = {
  userId: Scalars['String']['input']
}

export type QueryManagerGetBotRoleConnectionsArgs = {
  botId: Scalars['String']['input']
}

export type QueryManagerGetBotRolesArgs = {
  botId: Scalars['String']['input']
  serverId: Scalars['String']['input']
}

export type QueryManagerGetBotServerArgs = {
  botId: Scalars['String']['input']
  serverId: Scalars['String']['input']
}

export type QueryManagerGetBotServersArgs = {
  botId: Scalars['String']['input']
}

export type QueryUserFindManyUserArgs = {
  input: UserFindManyUserInput
}

export type QueryUserFindOneUserArgs = {
  username: Scalars['String']['input']
}

export type QueryUserRequestIdentityChallengeArgs = {
  input: RequestIdentityChallengeInput
}

export type RegisterInput = {
  password: Scalars['String']['input']
  username: Scalars['String']['input']
}

export type RequestIdentityChallengeInput = {
  provider: IdentityProvider
  providerId: Scalars['String']['input']
}

export type User = {
  __typename?: 'User'
  avatarUrl?: Maybe<Scalars['String']['output']>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  developer?: Maybe<Scalars['Boolean']['output']>
  id: Scalars['String']['output']
  name?: Maybe<Scalars['String']['output']>
  profileUrl?: Maybe<Scalars['String']['output']>
  role?: Maybe<UserRole>
  status?: Maybe<UserStatus>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
  username?: Maybe<Scalars['String']['output']>
}

export type UserFindManyUserInput = {
  limit?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  search?: InputMaybe<Scalars['String']['input']>
}

export type UserPaging = {
  __typename?: 'UserPaging'
  data: Array<User>
  meta: PagingMeta
}

export enum UserRole {
  Admin = 'Admin',
  User = 'User',
}

export enum UserStatus {
  Active = 'Active',
  Created = 'Created',
  Inactive = 'Inactive',
}

export type UserUpdateUserInput = {
  avatarUrl?: InputMaybe<Scalars['String']['input']>
  developer?: InputMaybe<Scalars['Boolean']['input']>
  name?: InputMaybe<Scalars['String']['input']>
}

export type VerifyIdentityChallengeInput = {
  challenge: Scalars['String']['input']
  provider: IdentityProvider
  providerId: Scalars['String']['input']
  signature: Scalars['String']['input']
  useLedger?: InputMaybe<Scalars['Boolean']['input']>
}

export type LoginMutationVariables = Exact<{
  input: LoginInput
}>

export type LoginMutation = {
  __typename?: 'Mutation'
  login?: {
    __typename?: 'User'
    avatarUrl?: string | null
    createdAt?: Date | null
    developer?: boolean | null
    id: string
    name?: string | null
    profileUrl?: string | null
    role?: UserRole | null
    status?: UserStatus | null
    updatedAt?: Date | null
    username?: string | null
  } | null
}

export type LogoutMutationVariables = Exact<{ [key: string]: never }>

export type LogoutMutation = { __typename?: 'Mutation'; logout?: boolean | null }

export type RegisterMutationVariables = Exact<{
  input: RegisterInput
}>

export type RegisterMutation = {
  __typename?: 'Mutation'
  register?: {
    __typename?: 'User'
    avatarUrl?: string | null
    createdAt?: Date | null
    developer?: boolean | null
    id: string
    name?: string | null
    profileUrl?: string | null
    role?: UserRole | null
    status?: UserStatus | null
    updatedAt?: Date | null
    username?: string | null
  } | null
}

export type MeQueryVariables = Exact<{ [key: string]: never }>

export type MeQuery = {
  __typename?: 'Query'
  me?: {
    __typename?: 'User'
    avatarUrl?: string | null
    createdAt?: Date | null
    developer?: boolean | null
    id: string
    name?: string | null
    profileUrl?: string | null
    role?: UserRole | null
    status?: UserStatus | null
    updatedAt?: Date | null
    username?: string | null
  } | null
}

export type BotDetailsFragment = {
  __typename?: 'Bot'
  avatarUrl?: string | null
  createdAt?: Date | null
  developersUrl: string
  id: string
  inviteUrl: string
  name: string
  redirectUrl: string
  redirectUrlSet?: boolean | null
  started: boolean
  status?: BotStatus | null
  updatedAt?: Date | null
  verificationUrl: string
  verificationUrlSet?: boolean | null
}

export type DiscordServerDetailsFragment = {
  __typename?: 'DiscordServer'
  id: string
  name: string
  icon?: string | null
  permissions?: Array<string> | null
}

export type DiscordServerRoleDetailsFragment = {
  __typename?: 'DiscordServerRole'
  id: string
  name: string
  managed: boolean
  color: number
  position: number
}

export type DiscordRoleConnectionDetailsFragment = {
  __typename?: 'DiscordRoleConnection'
  key: string
  name: string
  type: DiscordRoleConnectionType
  description: string
}

export type AdminFindManyBotQueryVariables = Exact<{
  input: AdminFindManyBotInput
}>

export type AdminFindManyBotQuery = {
  __typename?: 'Query'
  paging?: {
    __typename?: 'BotPaging'
    data: Array<{
      __typename?: 'Bot'
      avatarUrl?: string | null
      createdAt?: Date | null
      developersUrl: string
      id: string
      inviteUrl: string
      name: string
      redirectUrl: string
      redirectUrlSet?: boolean | null
      started: boolean
      status?: BotStatus | null
      updatedAt?: Date | null
      verificationUrl: string
      verificationUrlSet?: boolean | null
    }>
    meta: {
      __typename?: 'PagingMeta'
      currentPage: number
      isFirstPage: boolean
      isLastPage: boolean
      nextPage?: number | null
      pageCount?: number | null
      previousPage?: number | null
      totalCount?: number | null
    }
  } | null
}

export type AdminFindOneBotQueryVariables = Exact<{
  botId: Scalars['String']['input']
}>

export type AdminFindOneBotQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'Bot'
    avatarUrl?: string | null
    createdAt?: Date | null
    developersUrl: string
    id: string
    inviteUrl: string
    name: string
    redirectUrl: string
    redirectUrlSet?: boolean | null
    started: boolean
    status?: BotStatus | null
    updatedAt?: Date | null
    verificationUrl: string
    verificationUrlSet?: boolean | null
  } | null
}

export type AdminCreateBotMutationVariables = Exact<{
  input: AdminCreateBotInput
}>

export type AdminCreateBotMutation = {
  __typename?: 'Mutation'
  created?: {
    __typename?: 'Bot'
    avatarUrl?: string | null
    createdAt?: Date | null
    developersUrl: string
    id: string
    inviteUrl: string
    name: string
    redirectUrl: string
    redirectUrlSet?: boolean | null
    started: boolean
    status?: BotStatus | null
    updatedAt?: Date | null
    verificationUrl: string
    verificationUrlSet?: boolean | null
  } | null
}

export type AdminUpdateBotMutationVariables = Exact<{
  botId: Scalars['String']['input']
  input: AdminUpdateBotInput
}>

export type AdminUpdateBotMutation = {
  __typename?: 'Mutation'
  updated?: {
    __typename?: 'Bot'
    avatarUrl?: string | null
    createdAt?: Date | null
    developersUrl: string
    id: string
    inviteUrl: string
    name: string
    redirectUrl: string
    redirectUrlSet?: boolean | null
    started: boolean
    status?: BotStatus | null
    updatedAt?: Date | null
    verificationUrl: string
    verificationUrlSet?: boolean | null
  } | null
}

export type AdminDeleteBotMutationVariables = Exact<{
  botId: Scalars['String']['input']
}>

export type AdminDeleteBotMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

export type ManagerStartBotMutationVariables = Exact<{
  botId: Scalars['String']['input']
}>

export type ManagerStartBotMutation = { __typename?: 'Mutation'; started?: boolean | null }

export type ManagerStopBotMutationVariables = Exact<{
  botId: Scalars['String']['input']
}>

export type ManagerStopBotMutation = { __typename?: 'Mutation'; stopped?: boolean | null }

export type ManagerLeaveBotServerMutationVariables = Exact<{
  botId: Scalars['String']['input']
  serverId: Scalars['String']['input']
}>

export type ManagerLeaveBotServerMutation = { __typename?: 'Mutation'; left?: boolean | null }

export type ManagerGetBotRoleConnectionsQueryVariables = Exact<{
  botId: Scalars['String']['input']
}>

export type ManagerGetBotRoleConnectionsQuery = {
  __typename?: 'Query'
  items?: Array<{
    __typename?: 'DiscordRoleConnection'
    key: string
    name: string
    type: DiscordRoleConnectionType
    description: string
  }> | null
}

export type ManagerGetBotRolesQueryVariables = Exact<{
  botId: Scalars['String']['input']
  serverId: Scalars['String']['input']
}>

export type ManagerGetBotRolesQuery = {
  __typename?: 'Query'
  items?: Array<{
    __typename?: 'DiscordServerRole'
    id: string
    name: string
    managed: boolean
    color: number
    position: number
  }> | null
}

export type ManagerGetBotServersQueryVariables = Exact<{
  botId: Scalars['String']['input']
}>

export type ManagerGetBotServersQuery = {
  __typename?: 'Query'
  items?: Array<{
    __typename?: 'DiscordServer'
    id: string
    name: string
    icon?: string | null
    permissions?: Array<string> | null
  }> | null
}

export type ManagerGetBotServerQueryVariables = Exact<{
  botId: Scalars['String']['input']
  serverId: Scalars['String']['input']
}>

export type ManagerGetBotServerQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'DiscordServer'
    id: string
    name: string
    icon?: string | null
    permissions?: Array<string> | null
  } | null
}

export type ManagerAddBotRoleConnectionMutationVariables = Exact<{
  botId: Scalars['String']['input']
  input: AddBotRoleConnectionInput
}>

export type ManagerAddBotRoleConnectionMutation = {
  __typename?: 'Mutation'
  items?: Array<{
    __typename?: 'DiscordRoleConnection'
    key: string
    name: string
    type: DiscordRoleConnectionType
    description: string
  }> | null
}

export type ManagerRemoveBotRoleConnectionMutationVariables = Exact<{
  botId: Scalars['String']['input']
  key: Scalars['String']['input']
}>

export type ManagerRemoveBotRoleConnectionMutation = {
  __typename?: 'Mutation'
  items?: Array<{
    __typename?: 'DiscordRoleConnection'
    key: string
    name: string
    type: DiscordRoleConnectionType
    description: string
  }> | null
}

export type CollectionDetailsFragment = {
  __typename?: 'Collection'
  account: string
  createdAt?: Date | null
  description?: string | null
  id: string
  imageUrl?: string | null
  metadataUrl?: string | null
  name?: string | null
  network: NetworkType
  symbol?: string | null
  updatedAt?: Date | null
}

export type AdminFindManyCollectionQueryVariables = Exact<{
  input: AdminFindManyCollectionInput
}>

export type AdminFindManyCollectionQuery = {
  __typename?: 'Query'
  paging?: {
    __typename?: 'CollectionPaging'
    data: Array<{
      __typename?: 'Collection'
      account: string
      createdAt?: Date | null
      description?: string | null
      id: string
      imageUrl?: string | null
      metadataUrl?: string | null
      name?: string | null
      network: NetworkType
      symbol?: string | null
      updatedAt?: Date | null
    }>
    meta: {
      __typename?: 'PagingMeta'
      currentPage: number
      isFirstPage: boolean
      isLastPage: boolean
      nextPage?: number | null
      pageCount?: number | null
      previousPage?: number | null
      totalCount?: number | null
    }
  } | null
}

export type AdminFindOneCollectionQueryVariables = Exact<{
  collectionId: Scalars['String']['input']
}>

export type AdminFindOneCollectionQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'Collection'
    account: string
    createdAt?: Date | null
    description?: string | null
    id: string
    imageUrl?: string | null
    metadataUrl?: string | null
    name?: string | null
    network: NetworkType
    symbol?: string | null
    updatedAt?: Date | null
  } | null
}

export type AdminCreateCollectionMutationVariables = Exact<{
  input: AdminCreateCollectionInput
}>

export type AdminCreateCollectionMutation = {
  __typename?: 'Mutation'
  created?: {
    __typename?: 'Collection'
    account: string
    createdAt?: Date | null
    description?: string | null
    id: string
    imageUrl?: string | null
    metadataUrl?: string | null
    name?: string | null
    network: NetworkType
    symbol?: string | null
    updatedAt?: Date | null
  } | null
}

export type AdminUpdateCollectionMutationVariables = Exact<{
  collectionId: Scalars['String']['input']
  input: AdminUpdateCollectionInput
}>

export type AdminUpdateCollectionMutation = {
  __typename?: 'Mutation'
  updated?: {
    __typename?: 'Collection'
    account: string
    createdAt?: Date | null
    description?: string | null
    id: string
    imageUrl?: string | null
    metadataUrl?: string | null
    name?: string | null
    network: NetworkType
    symbol?: string | null
    updatedAt?: Date | null
  } | null
}

export type AdminDeleteCollectionMutationVariables = Exact<{
  collectionId: Scalars['String']['input']
}>

export type AdminDeleteCollectionMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

export type AppConfigDetailsFragment = {
  __typename?: 'AppConfig'
  authDiscordEnabled: boolean
  authPasswordEnabled: boolean
  authRegisterEnabled: boolean
}

export type PagingMetaDetailsFragment = {
  __typename?: 'PagingMeta'
  currentPage: number
  isFirstPage: boolean
  isLastPage: boolean
  nextPage?: number | null
  pageCount?: number | null
  previousPage?: number | null
  totalCount?: number | null
}

export type UptimeQueryVariables = Exact<{ [key: string]: never }>

export type UptimeQuery = { __typename?: 'Query'; uptime: number }

export type AppConfigQueryVariables = Exact<{ [key: string]: never }>

export type AppConfigQuery = {
  __typename?: 'Query'
  config: {
    __typename?: 'AppConfig'
    authDiscordEnabled: boolean
    authPasswordEnabled: boolean
    authRegisterEnabled: boolean
  }
}

export type EmailDetailsFragment = {
  __typename?: 'Email'
  createdAt: Date
  default?: boolean | null
  email: string
  id: string
  private?: boolean | null
  updatedAt: Date
  verified?: boolean | null
}

export type AdminFindManyEmailQueryVariables = Exact<{
  input: AdminFindManyEmailInput
}>

export type AdminFindManyEmailQuery = {
  __typename?: 'Query'
  items?: Array<{
    __typename?: 'Email'
    createdAt: Date
    default?: boolean | null
    email: string
    id: string
    private?: boolean | null
    updatedAt: Date
    verified?: boolean | null
  }> | null
}

export type AdminCreateEmailMutationVariables = Exact<{
  input: AdminCreateEmailInput
}>

export type AdminCreateEmailMutation = {
  __typename?: 'Mutation'
  created?: {
    __typename?: 'Email'
    createdAt: Date
    default?: boolean | null
    email: string
    id: string
    private?: boolean | null
    updatedAt: Date
    verified?: boolean | null
  } | null
}

export type AdminUpdateEmailMutationVariables = Exact<{
  emailId: Scalars['String']['input']
  input: AdminUpdateEmailInput
}>

export type AdminUpdateEmailMutation = {
  __typename?: 'Mutation'
  updated?: {
    __typename?: 'Email'
    createdAt: Date
    default?: boolean | null
    email: string
    id: string
    private?: boolean | null
    updatedAt: Date
    verified?: boolean | null
  } | null
}

export type AdminDeleteEmailMutationVariables = Exact<{
  emailId: Scalars['String']['input']
}>

export type AdminDeleteEmailMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

export type IdentityDetailsFragment = {
  __typename?: 'Identity'
  createdAt: Date
  expired?: boolean | null
  id: string
  profile?: any | null
  provider: IdentityProvider
  providerId: string
  updatedAt: Date
  verified?: boolean | null
}

export type IdentityChallengeDetailsFragment = {
  __typename?: 'IdentityChallenge'
  id: string
  createdAt: Date
  updatedAt: Date
  provider: IdentityProvider
  providerId: string
  challenge: string
  signature?: string | null
  ip: string
  userAgent: string
  verified: boolean
}

export type AdminFindManyIdentityQueryVariables = Exact<{
  input: AdminFindManyIdentityInput
}>

export type AdminFindManyIdentityQuery = {
  __typename?: 'Query'
  items?: Array<{
    __typename?: 'Identity'
    createdAt: Date
    expired?: boolean | null
    id: string
    profile?: any | null
    provider: IdentityProvider
    providerId: string
    updatedAt: Date
    verified?: boolean | null
    challenges?: Array<{
      __typename?: 'IdentityChallenge'
      id: string
      createdAt: Date
      updatedAt: Date
      provider: IdentityProvider
      providerId: string
      challenge: string
      signature?: string | null
      ip: string
      userAgent: string
      verified: boolean
    }> | null
    owner?: {
      __typename?: 'User'
      avatarUrl?: string | null
      createdAt?: Date | null
      developer?: boolean | null
      id: string
      name?: string | null
      profileUrl?: string | null
      role?: UserRole | null
      status?: UserStatus | null
      updatedAt?: Date | null
      username?: string | null
    } | null
  }> | null
}

export type AdminCreateIdentityMutationVariables = Exact<{
  input: AdminCreateIdentityInput
}>

export type AdminCreateIdentityMutation = {
  __typename?: 'Mutation'
  created?: {
    __typename?: 'Identity'
    createdAt: Date
    expired?: boolean | null
    id: string
    profile?: any | null
    provider: IdentityProvider
    providerId: string
    updatedAt: Date
    verified?: boolean | null
  } | null
}

export type AdminDeleteIdentityMutationVariables = Exact<{
  identityId: Scalars['String']['input']
}>

export type AdminDeleteIdentityMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

export type UserFindManyIdentityQueryVariables = Exact<{ [key: string]: never }>

export type UserFindManyIdentityQuery = {
  __typename?: 'Query'
  items?: Array<{
    __typename?: 'Identity'
    createdAt: Date
    expired?: boolean | null
    id: string
    profile?: any | null
    provider: IdentityProvider
    providerId: string
    updatedAt: Date
    verified?: boolean | null
  }> | null
}

export type UserDeleteIdentityMutationVariables = Exact<{
  identityId: Scalars['String']['input']
}>

export type UserDeleteIdentityMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

export type UserRequestIdentityChallengeQueryVariables = Exact<{
  input: RequestIdentityChallengeInput
}>

export type UserRequestIdentityChallengeQuery = {
  __typename?: 'Query'
  challenge?: {
    __typename?: 'IdentityChallenge'
    id: string
    createdAt: Date
    updatedAt: Date
    provider: IdentityProvider
    providerId: string
    challenge: string
    signature?: string | null
    ip: string
    userAgent: string
    verified: boolean
  } | null
}

export type UserVerifyIdentityChallengeMutationVariables = Exact<{
  input: VerifyIdentityChallengeInput
}>

export type UserVerifyIdentityChallengeMutation = {
  __typename?: 'Mutation'
  verified?: {
    __typename?: 'IdentityChallenge'
    id: string
    createdAt: Date
    updatedAt: Date
    provider: IdentityProvider
    providerId: string
    challenge: string
    signature?: string | null
    ip: string
    userAgent: string
    verified: boolean
  } | null
}

export type UserLinkIdentityMutationVariables = Exact<{
  input: LinkIdentityInput
}>

export type UserLinkIdentityMutation = {
  __typename?: 'Mutation'
  linked?: {
    __typename?: 'Identity'
    createdAt: Date
    expired?: boolean | null
    id: string
    profile?: any | null
    provider: IdentityProvider
    providerId: string
    updatedAt: Date
    verified?: boolean | null
  } | null
}

export type NetworkDetailsFragment = {
  __typename?: 'Network'
  createdAt?: Date | null
  id: string
  name: string
  type: NetworkType
  endpoint: string
  updatedAt?: Date | null
}

export type AdminFindManyNetworkQueryVariables = Exact<{
  input: AdminFindManyNetworkInput
}>

export type AdminFindManyNetworkQuery = {
  __typename?: 'Query'
  paging?: {
    __typename?: 'NetworkPaging'
    data: Array<{
      __typename?: 'Network'
      createdAt?: Date | null
      id: string
      name: string
      type: NetworkType
      endpoint: string
      updatedAt?: Date | null
    }>
    meta: {
      __typename?: 'PagingMeta'
      currentPage: number
      isFirstPage: boolean
      isLastPage: boolean
      nextPage?: number | null
      pageCount?: number | null
      previousPage?: number | null
      totalCount?: number | null
    }
  } | null
}

export type AdminFindOneNetworkQueryVariables = Exact<{
  networkId: Scalars['String']['input']
}>

export type AdminFindOneNetworkQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'Network'
    createdAt?: Date | null
    id: string
    name: string
    type: NetworkType
    endpoint: string
    updatedAt?: Date | null
  } | null
}

export type AdminCreateNetworkMutationVariables = Exact<{
  input: AdminCreateNetworkInput
}>

export type AdminCreateNetworkMutation = {
  __typename?: 'Mutation'
  created?: {
    __typename?: 'Network'
    createdAt?: Date | null
    id: string
    name: string
    type: NetworkType
    endpoint: string
    updatedAt?: Date | null
  } | null
}

export type AdminUpdateNetworkMutationVariables = Exact<{
  networkId: Scalars['String']['input']
  input: AdminUpdateNetworkInput
}>

export type AdminUpdateNetworkMutation = {
  __typename?: 'Mutation'
  updated?: {
    __typename?: 'Network'
    createdAt?: Date | null
    id: string
    name: string
    type: NetworkType
    endpoint: string
    updatedAt?: Date | null
  } | null
}

export type AdminDeleteNetworkMutationVariables = Exact<{
  networkId: Scalars['String']['input']
}>

export type AdminDeleteNetworkMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

export type UserDetailsFragment = {
  __typename?: 'User'
  avatarUrl?: string | null
  createdAt?: Date | null
  developer?: boolean | null
  id: string
  name?: string | null
  profileUrl?: string | null
  role?: UserRole | null
  status?: UserStatus | null
  updatedAt?: Date | null
  username?: string | null
}

export type AdminCreateUserMutationVariables = Exact<{
  input: AdminCreateUserInput
}>

export type AdminCreateUserMutation = {
  __typename?: 'Mutation'
  created?: {
    __typename?: 'User'
    avatarUrl?: string | null
    createdAt?: Date | null
    developer?: boolean | null
    id: string
    name?: string | null
    profileUrl?: string | null
    role?: UserRole | null
    status?: UserStatus | null
    updatedAt?: Date | null
    username?: string | null
  } | null
}

export type AdminDeleteUserMutationVariables = Exact<{
  userId: Scalars['String']['input']
}>

export type AdminDeleteUserMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

export type AdminFindManyUserQueryVariables = Exact<{
  input: AdminFindManyUserInput
}>

export type AdminFindManyUserQuery = {
  __typename?: 'Query'
  paging?: {
    __typename?: 'UserPaging'
    data: Array<{
      __typename?: 'User'
      avatarUrl?: string | null
      createdAt?: Date | null
      developer?: boolean | null
      id: string
      name?: string | null
      profileUrl?: string | null
      role?: UserRole | null
      status?: UserStatus | null
      updatedAt?: Date | null
      username?: string | null
    }>
    meta: {
      __typename?: 'PagingMeta'
      currentPage: number
      isFirstPage: boolean
      isLastPage: boolean
      nextPage?: number | null
      pageCount?: number | null
      previousPage?: number | null
      totalCount?: number | null
    }
  } | null
}

export type AdminFindOneUserQueryVariables = Exact<{
  userId: Scalars['String']['input']
}>

export type AdminFindOneUserQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'User'
    avatarUrl?: string | null
    createdAt?: Date | null
    developer?: boolean | null
    id: string
    name?: string | null
    profileUrl?: string | null
    role?: UserRole | null
    status?: UserStatus | null
    updatedAt?: Date | null
    username?: string | null
  } | null
}

export type AdminUpdateUserMutationVariables = Exact<{
  userId: Scalars['String']['input']
  input: AdminUpdateUserInput
}>

export type AdminUpdateUserMutation = {
  __typename?: 'Mutation'
  updated?: {
    __typename?: 'User'
    avatarUrl?: string | null
    createdAt?: Date | null
    developer?: boolean | null
    id: string
    name?: string | null
    profileUrl?: string | null
    role?: UserRole | null
    status?: UserStatus | null
    updatedAt?: Date | null
    username?: string | null
  } | null
}

export type UserFindManyUserQueryVariables = Exact<{
  input: UserFindManyUserInput
}>

export type UserFindManyUserQuery = {
  __typename?: 'Query'
  paging?: {
    __typename?: 'UserPaging'
    data: Array<{
      __typename?: 'User'
      avatarUrl?: string | null
      createdAt?: Date | null
      developer?: boolean | null
      id: string
      name?: string | null
      profileUrl?: string | null
      role?: UserRole | null
      status?: UserStatus | null
      updatedAt?: Date | null
      username?: string | null
    }>
    meta: {
      __typename?: 'PagingMeta'
      currentPage: number
      isFirstPage: boolean
      isLastPage: boolean
      nextPage?: number | null
      pageCount?: number | null
      previousPage?: number | null
      totalCount?: number | null
    }
  } | null
}

export type UserFindOneUserQueryVariables = Exact<{
  username: Scalars['String']['input']
}>

export type UserFindOneUserQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'User'
    avatarUrl?: string | null
    createdAt?: Date | null
    developer?: boolean | null
    id: string
    name?: string | null
    profileUrl?: string | null
    role?: UserRole | null
    status?: UserStatus | null
    updatedAt?: Date | null
    username?: string | null
  } | null
}

export type UserUpdateUserMutationVariables = Exact<{
  input: UserUpdateUserInput
}>

export type UserUpdateUserMutation = {
  __typename?: 'Mutation'
  updated?: {
    __typename?: 'User'
    avatarUrl?: string | null
    createdAt?: Date | null
    developer?: boolean | null
    id: string
    name?: string | null
    profileUrl?: string | null
    role?: UserRole | null
    status?: UserStatus | null
    updatedAt?: Date | null
    username?: string | null
  } | null
}

export const BotDetailsFragmentDoc = gql`
  fragment BotDetails on Bot {
    avatarUrl
    createdAt
    developersUrl
    id
    inviteUrl
    name
    redirectUrl
    redirectUrlSet
    started
    status
    updatedAt
    verificationUrl
    verificationUrlSet
  }
`
export const DiscordServerDetailsFragmentDoc = gql`
  fragment DiscordServerDetails on DiscordServer {
    id
    name
    icon
    permissions
  }
`
export const DiscordServerRoleDetailsFragmentDoc = gql`
  fragment DiscordServerRoleDetails on DiscordServerRole {
    id
    name
    managed
    color
    position
  }
`
export const DiscordRoleConnectionDetailsFragmentDoc = gql`
  fragment DiscordRoleConnectionDetails on DiscordRoleConnection {
    key
    name
    type
    description
  }
`
export const CollectionDetailsFragmentDoc = gql`
  fragment CollectionDetails on Collection {
    account
    createdAt
    description
    id
    imageUrl
    metadataUrl
    name
    network
    symbol
    updatedAt
  }
`
export const AppConfigDetailsFragmentDoc = gql`
  fragment AppConfigDetails on AppConfig {
    authDiscordEnabled
    authPasswordEnabled
    authRegisterEnabled
  }
`
export const PagingMetaDetailsFragmentDoc = gql`
  fragment PagingMetaDetails on PagingMeta {
    currentPage
    isFirstPage
    isLastPage
    nextPage
    pageCount
    previousPage
    totalCount
  }
`
export const EmailDetailsFragmentDoc = gql`
  fragment EmailDetails on Email {
    createdAt
    default
    email
    id
    private
    updatedAt
    verified
  }
`
export const IdentityDetailsFragmentDoc = gql`
  fragment IdentityDetails on Identity {
    createdAt
    expired
    id
    profile
    provider
    providerId
    updatedAt
    verified
  }
`
export const IdentityChallengeDetailsFragmentDoc = gql`
  fragment IdentityChallengeDetails on IdentityChallenge {
    id
    createdAt
    updatedAt
    provider
    providerId
    challenge
    signature
    ip
    userAgent
    verified
  }
`
export const NetworkDetailsFragmentDoc = gql`
  fragment NetworkDetails on Network {
    createdAt
    id
    name
    type
    endpoint
    updatedAt
  }
`
export const UserDetailsFragmentDoc = gql`
  fragment UserDetails on User {
    avatarUrl
    createdAt
    developer
    id
    name
    profileUrl
    role
    status
    updatedAt
    username
  }
`
export const LoginDocument = gql`
  mutation login($input: LoginInput!) {
    login(input: $input) {
      ...UserDetails
    }
  }
  ${UserDetailsFragmentDoc}
`
export const LogoutDocument = gql`
  mutation logout {
    logout
  }
`
export const RegisterDocument = gql`
  mutation register($input: RegisterInput!) {
    register(input: $input) {
      ...UserDetails
    }
  }
  ${UserDetailsFragmentDoc}
`
export const MeDocument = gql`
  query me {
    me {
      ...UserDetails
    }
  }
  ${UserDetailsFragmentDoc}
`
export const AdminFindManyBotDocument = gql`
  query adminFindManyBot($input: AdminFindManyBotInput!) {
    paging: adminFindManyBot(input: $input) {
      data {
        ...BotDetails
      }
      meta {
        ...PagingMetaDetails
      }
    }
  }
  ${BotDetailsFragmentDoc}
  ${PagingMetaDetailsFragmentDoc}
`
export const AdminFindOneBotDocument = gql`
  query adminFindOneBot($botId: String!) {
    item: adminFindOneBot(botId: $botId) {
      ...BotDetails
    }
  }
  ${BotDetailsFragmentDoc}
`
export const AdminCreateBotDocument = gql`
  mutation adminCreateBot($input: AdminCreateBotInput!) {
    created: adminCreateBot(input: $input) {
      ...BotDetails
    }
  }
  ${BotDetailsFragmentDoc}
`
export const AdminUpdateBotDocument = gql`
  mutation adminUpdateBot($botId: String!, $input: AdminUpdateBotInput!) {
    updated: adminUpdateBot(botId: $botId, input: $input) {
      ...BotDetails
    }
  }
  ${BotDetailsFragmentDoc}
`
export const AdminDeleteBotDocument = gql`
  mutation adminDeleteBot($botId: String!) {
    deleted: adminDeleteBot(botId: $botId)
  }
`
export const ManagerStartBotDocument = gql`
  mutation managerStartBot($botId: String!) {
    started: managerStartBot(botId: $botId)
  }
`
export const ManagerStopBotDocument = gql`
  mutation managerStopBot($botId: String!) {
    stopped: managerStopBot(botId: $botId)
  }
`
export const ManagerLeaveBotServerDocument = gql`
  mutation managerLeaveBotServer($botId: String!, $serverId: String!) {
    left: managerLeaveBotServer(botId: $botId, serverId: $serverId)
  }
`
export const ManagerGetBotRoleConnectionsDocument = gql`
  query managerGetBotRoleConnections($botId: String!) {
    items: managerGetBotRoleConnections(botId: $botId) {
      ...DiscordRoleConnectionDetails
    }
  }
  ${DiscordRoleConnectionDetailsFragmentDoc}
`
export const ManagerGetBotRolesDocument = gql`
  query managerGetBotRoles($botId: String!, $serverId: String!) {
    items: managerGetBotRoles(botId: $botId, serverId: $serverId) {
      ...DiscordServerRoleDetails
    }
  }
  ${DiscordServerRoleDetailsFragmentDoc}
`
export const ManagerGetBotServersDocument = gql`
  query managerGetBotServers($botId: String!) {
    items: managerGetBotServers(botId: $botId) {
      ...DiscordServerDetails
    }
  }
  ${DiscordServerDetailsFragmentDoc}
`
export const ManagerGetBotServerDocument = gql`
  query managerGetBotServer($botId: String!, $serverId: String!) {
    item: managerGetBotServer(botId: $botId, serverId: $serverId) {
      ...DiscordServerDetails
    }
  }
  ${DiscordServerDetailsFragmentDoc}
`
export const ManagerAddBotRoleConnectionDocument = gql`
  mutation managerAddBotRoleConnection($botId: String!, $input: AddBotRoleConnectionInput!) {
    items: managerAddBotRoleConnection(botId: $botId, input: $input) {
      ...DiscordRoleConnectionDetails
    }
  }
  ${DiscordRoleConnectionDetailsFragmentDoc}
`
export const ManagerRemoveBotRoleConnectionDocument = gql`
  mutation managerRemoveBotRoleConnection($botId: String!, $key: String!) {
    items: managerRemoveBotRoleConnection(botId: $botId, key: $key) {
      ...DiscordRoleConnectionDetails
    }
  }
  ${DiscordRoleConnectionDetailsFragmentDoc}
`
export const AdminFindManyCollectionDocument = gql`
  query adminFindManyCollection($input: AdminFindManyCollectionInput!) {
    paging: adminFindManyCollection(input: $input) {
      data {
        ...CollectionDetails
      }
      meta {
        ...PagingMetaDetails
      }
    }
  }
  ${CollectionDetailsFragmentDoc}
  ${PagingMetaDetailsFragmentDoc}
`
export const AdminFindOneCollectionDocument = gql`
  query adminFindOneCollection($collectionId: String!) {
    item: adminFindOneCollection(collectionId: $collectionId) {
      ...CollectionDetails
    }
  }
  ${CollectionDetailsFragmentDoc}
`
export const AdminCreateCollectionDocument = gql`
  mutation adminCreateCollection($input: AdminCreateCollectionInput!) {
    created: adminCreateCollection(input: $input) {
      ...CollectionDetails
    }
  }
  ${CollectionDetailsFragmentDoc}
`
export const AdminUpdateCollectionDocument = gql`
  mutation adminUpdateCollection($collectionId: String!, $input: AdminUpdateCollectionInput!) {
    updated: adminUpdateCollection(collectionId: $collectionId, input: $input) {
      ...CollectionDetails
    }
  }
  ${CollectionDetailsFragmentDoc}
`
export const AdminDeleteCollectionDocument = gql`
  mutation adminDeleteCollection($collectionId: String!) {
    deleted: adminDeleteCollection(collectionId: $collectionId)
  }
`
export const UptimeDocument = gql`
  query uptime {
    uptime
  }
`
export const AppConfigDocument = gql`
  query appConfig {
    config: appConfig {
      ...AppConfigDetails
    }
  }
  ${AppConfigDetailsFragmentDoc}
`
export const AdminFindManyEmailDocument = gql`
  query adminFindManyEmail($input: AdminFindManyEmailInput!) {
    items: adminFindManyEmail(input: $input) {
      ...EmailDetails
    }
  }
  ${EmailDetailsFragmentDoc}
`
export const AdminCreateEmailDocument = gql`
  mutation adminCreateEmail($input: AdminCreateEmailInput!) {
    created: adminCreateEmail(input: $input) {
      ...EmailDetails
    }
  }
  ${EmailDetailsFragmentDoc}
`
export const AdminUpdateEmailDocument = gql`
  mutation adminUpdateEmail($emailId: String!, $input: AdminUpdateEmailInput!) {
    updated: adminUpdateEmail(emailId: $emailId, input: $input) {
      ...EmailDetails
    }
  }
  ${EmailDetailsFragmentDoc}
`
export const AdminDeleteEmailDocument = gql`
  mutation adminDeleteEmail($emailId: String!) {
    deleted: adminDeleteEmail(emailId: $emailId)
  }
`
export const AdminFindManyIdentityDocument = gql`
  query adminFindManyIdentity($input: AdminFindManyIdentityInput!) {
    items: adminFindManyIdentity(input: $input) {
      ...IdentityDetails
      challenges {
        ...IdentityChallengeDetails
      }
      owner {
        ...UserDetails
      }
    }
  }
  ${IdentityDetailsFragmentDoc}
  ${IdentityChallengeDetailsFragmentDoc}
  ${UserDetailsFragmentDoc}
`
export const AdminCreateIdentityDocument = gql`
  mutation adminCreateIdentity($input: AdminCreateIdentityInput!) {
    created: adminCreateIdentity(input: $input) {
      ...IdentityDetails
    }
  }
  ${IdentityDetailsFragmentDoc}
`
export const AdminDeleteIdentityDocument = gql`
  mutation adminDeleteIdentity($identityId: String!) {
    deleted: adminDeleteIdentity(identityId: $identityId)
  }
`
export const UserFindManyIdentityDocument = gql`
  query userFindManyIdentity {
    items: userFindManyIdentity {
      ...IdentityDetails
    }
  }
  ${IdentityDetailsFragmentDoc}
`
export const UserDeleteIdentityDocument = gql`
  mutation userDeleteIdentity($identityId: String!) {
    deleted: userDeleteIdentity(identityId: $identityId)
  }
`
export const UserRequestIdentityChallengeDocument = gql`
  query userRequestIdentityChallenge($input: RequestIdentityChallengeInput!) {
    challenge: userRequestIdentityChallenge(input: $input) {
      ...IdentityChallengeDetails
    }
  }
  ${IdentityChallengeDetailsFragmentDoc}
`
export const UserVerifyIdentityChallengeDocument = gql`
  mutation userVerifyIdentityChallenge($input: VerifyIdentityChallengeInput!) {
    verified: userVerifyIdentityChallenge(input: $input) {
      ...IdentityChallengeDetails
    }
  }
  ${IdentityChallengeDetailsFragmentDoc}
`
export const UserLinkIdentityDocument = gql`
  mutation userLinkIdentity($input: LinkIdentityInput!) {
    linked: userLinkIdentity(input: $input) {
      ...IdentityDetails
    }
  }
  ${IdentityDetailsFragmentDoc}
`
export const AdminFindManyNetworkDocument = gql`
  query adminFindManyNetwork($input: AdminFindManyNetworkInput!) {
    paging: adminFindManyNetwork(input: $input) {
      data {
        ...NetworkDetails
      }
      meta {
        ...PagingMetaDetails
      }
    }
  }
  ${NetworkDetailsFragmentDoc}
  ${PagingMetaDetailsFragmentDoc}
`
export const AdminFindOneNetworkDocument = gql`
  query adminFindOneNetwork($networkId: String!) {
    item: adminFindOneNetwork(networkId: $networkId) {
      ...NetworkDetails
    }
  }
  ${NetworkDetailsFragmentDoc}
`
export const AdminCreateNetworkDocument = gql`
  mutation adminCreateNetwork($input: AdminCreateNetworkInput!) {
    created: adminCreateNetwork(input: $input) {
      ...NetworkDetails
    }
  }
  ${NetworkDetailsFragmentDoc}
`
export const AdminUpdateNetworkDocument = gql`
  mutation adminUpdateNetwork($networkId: String!, $input: AdminUpdateNetworkInput!) {
    updated: adminUpdateNetwork(networkId: $networkId, input: $input) {
      ...NetworkDetails
    }
  }
  ${NetworkDetailsFragmentDoc}
`
export const AdminDeleteNetworkDocument = gql`
  mutation adminDeleteNetwork($networkId: String!) {
    deleted: adminDeleteNetwork(networkId: $networkId)
  }
`
export const AdminCreateUserDocument = gql`
  mutation adminCreateUser($input: AdminCreateUserInput!) {
    created: adminCreateUser(input: $input) {
      ...UserDetails
    }
  }
  ${UserDetailsFragmentDoc}
`
export const AdminDeleteUserDocument = gql`
  mutation adminDeleteUser($userId: String!) {
    deleted: adminDeleteUser(userId: $userId)
  }
`
export const AdminFindManyUserDocument = gql`
  query adminFindManyUser($input: AdminFindManyUserInput!) {
    paging: adminFindManyUser(input: $input) {
      data {
        ...UserDetails
      }
      meta {
        ...PagingMetaDetails
      }
    }
  }
  ${UserDetailsFragmentDoc}
  ${PagingMetaDetailsFragmentDoc}
`
export const AdminFindOneUserDocument = gql`
  query adminFindOneUser($userId: String!) {
    item: adminFindOneUser(userId: $userId) {
      ...UserDetails
    }
  }
  ${UserDetailsFragmentDoc}
`
export const AdminUpdateUserDocument = gql`
  mutation adminUpdateUser($userId: String!, $input: AdminUpdateUserInput!) {
    updated: adminUpdateUser(userId: $userId, input: $input) {
      ...UserDetails
    }
  }
  ${UserDetailsFragmentDoc}
`
export const UserFindManyUserDocument = gql`
  query userFindManyUser($input: UserFindManyUserInput!) {
    paging: userFindManyUser(input: $input) {
      data {
        ...UserDetails
      }
      meta {
        ...PagingMetaDetails
      }
    }
  }
  ${UserDetailsFragmentDoc}
  ${PagingMetaDetailsFragmentDoc}
`
export const UserFindOneUserDocument = gql`
  query userFindOneUser($username: String!) {
    item: userFindOneUser(username: $username) {
      ...UserDetails
    }
  }
  ${UserDetailsFragmentDoc}
`
export const UserUpdateUserDocument = gql`
  mutation userUpdateUser($input: UserUpdateUserInput!) {
    updated: userUpdateUser(input: $input) {
      ...UserDetails
    }
  }
  ${UserDetailsFragmentDoc}
`

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action()
const LoginDocumentString = print(LoginDocument)
const LogoutDocumentString = print(LogoutDocument)
const RegisterDocumentString = print(RegisterDocument)
const MeDocumentString = print(MeDocument)
const AdminFindManyBotDocumentString = print(AdminFindManyBotDocument)
const AdminFindOneBotDocumentString = print(AdminFindOneBotDocument)
const AdminCreateBotDocumentString = print(AdminCreateBotDocument)
const AdminUpdateBotDocumentString = print(AdminUpdateBotDocument)
const AdminDeleteBotDocumentString = print(AdminDeleteBotDocument)
const ManagerStartBotDocumentString = print(ManagerStartBotDocument)
const ManagerStopBotDocumentString = print(ManagerStopBotDocument)
const ManagerLeaveBotServerDocumentString = print(ManagerLeaveBotServerDocument)
const ManagerGetBotRoleConnectionsDocumentString = print(ManagerGetBotRoleConnectionsDocument)
const ManagerGetBotRolesDocumentString = print(ManagerGetBotRolesDocument)
const ManagerGetBotServersDocumentString = print(ManagerGetBotServersDocument)
const ManagerGetBotServerDocumentString = print(ManagerGetBotServerDocument)
const ManagerAddBotRoleConnectionDocumentString = print(ManagerAddBotRoleConnectionDocument)
const ManagerRemoveBotRoleConnectionDocumentString = print(ManagerRemoveBotRoleConnectionDocument)
const AdminFindManyCollectionDocumentString = print(AdminFindManyCollectionDocument)
const AdminFindOneCollectionDocumentString = print(AdminFindOneCollectionDocument)
const AdminCreateCollectionDocumentString = print(AdminCreateCollectionDocument)
const AdminUpdateCollectionDocumentString = print(AdminUpdateCollectionDocument)
const AdminDeleteCollectionDocumentString = print(AdminDeleteCollectionDocument)
const UptimeDocumentString = print(UptimeDocument)
const AppConfigDocumentString = print(AppConfigDocument)
const AdminFindManyEmailDocumentString = print(AdminFindManyEmailDocument)
const AdminCreateEmailDocumentString = print(AdminCreateEmailDocument)
const AdminUpdateEmailDocumentString = print(AdminUpdateEmailDocument)
const AdminDeleteEmailDocumentString = print(AdminDeleteEmailDocument)
const AdminFindManyIdentityDocumentString = print(AdminFindManyIdentityDocument)
const AdminCreateIdentityDocumentString = print(AdminCreateIdentityDocument)
const AdminDeleteIdentityDocumentString = print(AdminDeleteIdentityDocument)
const UserFindManyIdentityDocumentString = print(UserFindManyIdentityDocument)
const UserDeleteIdentityDocumentString = print(UserDeleteIdentityDocument)
const UserRequestIdentityChallengeDocumentString = print(UserRequestIdentityChallengeDocument)
const UserVerifyIdentityChallengeDocumentString = print(UserVerifyIdentityChallengeDocument)
const UserLinkIdentityDocumentString = print(UserLinkIdentityDocument)
const AdminFindManyNetworkDocumentString = print(AdminFindManyNetworkDocument)
const AdminFindOneNetworkDocumentString = print(AdminFindOneNetworkDocument)
const AdminCreateNetworkDocumentString = print(AdminCreateNetworkDocument)
const AdminUpdateNetworkDocumentString = print(AdminUpdateNetworkDocument)
const AdminDeleteNetworkDocumentString = print(AdminDeleteNetworkDocument)
const AdminCreateUserDocumentString = print(AdminCreateUserDocument)
const AdminDeleteUserDocumentString = print(AdminDeleteUserDocument)
const AdminFindManyUserDocumentString = print(AdminFindManyUserDocument)
const AdminFindOneUserDocumentString = print(AdminFindOneUserDocument)
const AdminUpdateUserDocumentString = print(AdminUpdateUserDocument)
const UserFindManyUserDocumentString = print(UserFindManyUserDocument)
const UserFindOneUserDocumentString = print(UserFindOneUserDocument)
const UserUpdateUserDocumentString = print(UserUpdateUserDocument)
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    login(
      variables: LoginMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{ data: LoginMutation; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<LoginMutation>(LoginDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'login',
        'mutation',
      )
    },
    logout(
      variables?: LogoutMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{ data: LogoutMutation; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<LogoutMutation>(LogoutDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'logout',
        'mutation',
      )
    },
    register(
      variables: RegisterMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{ data: RegisterMutation; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<RegisterMutation>(RegisterDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'register',
        'mutation',
      )
    },
    me(
      variables?: MeQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{ data: MeQuery; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<MeQuery>(MeDocumentString, variables, { ...requestHeaders, ...wrappedRequestHeaders }),
        'me',
        'query',
      )
    },
    adminFindManyBot(
      variables: AdminFindManyBotQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{ data: AdminFindManyBotQuery; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindManyBotQuery>(AdminFindManyBotDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindManyBot',
        'query',
      )
    },
    adminFindOneBot(
      variables: AdminFindOneBotQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{ data: AdminFindOneBotQuery; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindOneBotQuery>(AdminFindOneBotDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindOneBot',
        'query',
      )
    },
    adminCreateBot(
      variables: AdminCreateBotMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{ data: AdminCreateBotMutation; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminCreateBotMutation>(AdminCreateBotDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminCreateBot',
        'mutation',
      )
    },
    adminUpdateBot(
      variables: AdminUpdateBotMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{ data: AdminUpdateBotMutation; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminUpdateBotMutation>(AdminUpdateBotDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminUpdateBot',
        'mutation',
      )
    },
    adminDeleteBot(
      variables: AdminDeleteBotMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{ data: AdminDeleteBotMutation; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminDeleteBotMutation>(AdminDeleteBotDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminDeleteBot',
        'mutation',
      )
    },
    managerStartBot(
      variables: ManagerStartBotMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{ data: ManagerStartBotMutation; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<ManagerStartBotMutation>(ManagerStartBotDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'managerStartBot',
        'mutation',
      )
    },
    managerStopBot(
      variables: ManagerStopBotMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{ data: ManagerStopBotMutation; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<ManagerStopBotMutation>(ManagerStopBotDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'managerStopBot',
        'mutation',
      )
    },
    managerLeaveBotServer(
      variables: ManagerLeaveBotServerMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{ data: ManagerLeaveBotServerMutation; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<ManagerLeaveBotServerMutation>(ManagerLeaveBotServerDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'managerLeaveBotServer',
        'mutation',
      )
    },
    managerGetBotRoleConnections(
      variables: ManagerGetBotRoleConnectionsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{ data: ManagerGetBotRoleConnectionsQuery; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<ManagerGetBotRoleConnectionsQuery>(ManagerGetBotRoleConnectionsDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'managerGetBotRoleConnections',
        'query',
      )
    },
    managerGetBotRoles(
      variables: ManagerGetBotRolesQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{ data: ManagerGetBotRolesQuery; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<ManagerGetBotRolesQuery>(ManagerGetBotRolesDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'managerGetBotRoles',
        'query',
      )
    },
    managerGetBotServers(
      variables: ManagerGetBotServersQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{ data: ManagerGetBotServersQuery; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<ManagerGetBotServersQuery>(ManagerGetBotServersDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'managerGetBotServers',
        'query',
      )
    },
    managerGetBotServer(
      variables: ManagerGetBotServerQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{ data: ManagerGetBotServerQuery; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<ManagerGetBotServerQuery>(ManagerGetBotServerDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'managerGetBotServer',
        'query',
      )
    },
    managerAddBotRoleConnection(
      variables: ManagerAddBotRoleConnectionMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{ data: ManagerAddBotRoleConnectionMutation; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<ManagerAddBotRoleConnectionMutation>(ManagerAddBotRoleConnectionDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'managerAddBotRoleConnection',
        'mutation',
      )
    },
    managerRemoveBotRoleConnection(
      variables: ManagerRemoveBotRoleConnectionMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: ManagerRemoveBotRoleConnectionMutation
      extensions?: any
      headers: Dom.Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<ManagerRemoveBotRoleConnectionMutation>(
            ManagerRemoveBotRoleConnectionDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'managerRemoveBotRoleConnection',
        'mutation',
      )
    },
    adminFindManyCollection(
      variables: AdminFindManyCollectionQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{ data: AdminFindManyCollectionQuery; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindManyCollectionQuery>(AdminFindManyCollectionDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindManyCollection',
        'query',
      )
    },
    adminFindOneCollection(
      variables: AdminFindOneCollectionQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{ data: AdminFindOneCollectionQuery; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindOneCollectionQuery>(AdminFindOneCollectionDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindOneCollection',
        'query',
      )
    },
    adminCreateCollection(
      variables: AdminCreateCollectionMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{ data: AdminCreateCollectionMutation; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminCreateCollectionMutation>(AdminCreateCollectionDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminCreateCollection',
        'mutation',
      )
    },
    adminUpdateCollection(
      variables: AdminUpdateCollectionMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{ data: AdminUpdateCollectionMutation; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminUpdateCollectionMutation>(AdminUpdateCollectionDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminUpdateCollection',
        'mutation',
      )
    },
    adminDeleteCollection(
      variables: AdminDeleteCollectionMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{ data: AdminDeleteCollectionMutation; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminDeleteCollectionMutation>(AdminDeleteCollectionDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminDeleteCollection',
        'mutation',
      )
    },
    uptime(
      variables?: UptimeQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{ data: UptimeQuery; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UptimeQuery>(UptimeDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'uptime',
        'query',
      )
    },
    appConfig(
      variables?: AppConfigQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{ data: AppConfigQuery; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AppConfigQuery>(AppConfigDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'appConfig',
        'query',
      )
    },
    adminFindManyEmail(
      variables: AdminFindManyEmailQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{ data: AdminFindManyEmailQuery; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindManyEmailQuery>(AdminFindManyEmailDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindManyEmail',
        'query',
      )
    },
    adminCreateEmail(
      variables: AdminCreateEmailMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{ data: AdminCreateEmailMutation; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminCreateEmailMutation>(AdminCreateEmailDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminCreateEmail',
        'mutation',
      )
    },
    adminUpdateEmail(
      variables: AdminUpdateEmailMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{ data: AdminUpdateEmailMutation; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminUpdateEmailMutation>(AdminUpdateEmailDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminUpdateEmail',
        'mutation',
      )
    },
    adminDeleteEmail(
      variables: AdminDeleteEmailMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{ data: AdminDeleteEmailMutation; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminDeleteEmailMutation>(AdminDeleteEmailDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminDeleteEmail',
        'mutation',
      )
    },
    adminFindManyIdentity(
      variables: AdminFindManyIdentityQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{ data: AdminFindManyIdentityQuery; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindManyIdentityQuery>(AdminFindManyIdentityDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindManyIdentity',
        'query',
      )
    },
    adminCreateIdentity(
      variables: AdminCreateIdentityMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{ data: AdminCreateIdentityMutation; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminCreateIdentityMutation>(AdminCreateIdentityDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminCreateIdentity',
        'mutation',
      )
    },
    adminDeleteIdentity(
      variables: AdminDeleteIdentityMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{ data: AdminDeleteIdentityMutation; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminDeleteIdentityMutation>(AdminDeleteIdentityDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminDeleteIdentity',
        'mutation',
      )
    },
    userFindManyIdentity(
      variables?: UserFindManyIdentityQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{ data: UserFindManyIdentityQuery; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserFindManyIdentityQuery>(UserFindManyIdentityDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userFindManyIdentity',
        'query',
      )
    },
    userDeleteIdentity(
      variables: UserDeleteIdentityMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{ data: UserDeleteIdentityMutation; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserDeleteIdentityMutation>(UserDeleteIdentityDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userDeleteIdentity',
        'mutation',
      )
    },
    userRequestIdentityChallenge(
      variables: UserRequestIdentityChallengeQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{ data: UserRequestIdentityChallengeQuery; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserRequestIdentityChallengeQuery>(UserRequestIdentityChallengeDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userRequestIdentityChallenge',
        'query',
      )
    },
    userVerifyIdentityChallenge(
      variables: UserVerifyIdentityChallengeMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{ data: UserVerifyIdentityChallengeMutation; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserVerifyIdentityChallengeMutation>(UserVerifyIdentityChallengeDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userVerifyIdentityChallenge',
        'mutation',
      )
    },
    userLinkIdentity(
      variables: UserLinkIdentityMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{ data: UserLinkIdentityMutation; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserLinkIdentityMutation>(UserLinkIdentityDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userLinkIdentity',
        'mutation',
      )
    },
    adminFindManyNetwork(
      variables: AdminFindManyNetworkQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{ data: AdminFindManyNetworkQuery; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindManyNetworkQuery>(AdminFindManyNetworkDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindManyNetwork',
        'query',
      )
    },
    adminFindOneNetwork(
      variables: AdminFindOneNetworkQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{ data: AdminFindOneNetworkQuery; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindOneNetworkQuery>(AdminFindOneNetworkDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindOneNetwork',
        'query',
      )
    },
    adminCreateNetwork(
      variables: AdminCreateNetworkMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{ data: AdminCreateNetworkMutation; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminCreateNetworkMutation>(AdminCreateNetworkDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminCreateNetwork',
        'mutation',
      )
    },
    adminUpdateNetwork(
      variables: AdminUpdateNetworkMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{ data: AdminUpdateNetworkMutation; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminUpdateNetworkMutation>(AdminUpdateNetworkDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminUpdateNetwork',
        'mutation',
      )
    },
    adminDeleteNetwork(
      variables: AdminDeleteNetworkMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{ data: AdminDeleteNetworkMutation; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminDeleteNetworkMutation>(AdminDeleteNetworkDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminDeleteNetwork',
        'mutation',
      )
    },
    adminCreateUser(
      variables: AdminCreateUserMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{ data: AdminCreateUserMutation; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminCreateUserMutation>(AdminCreateUserDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminCreateUser',
        'mutation',
      )
    },
    adminDeleteUser(
      variables: AdminDeleteUserMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{ data: AdminDeleteUserMutation; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminDeleteUserMutation>(AdminDeleteUserDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminDeleteUser',
        'mutation',
      )
    },
    adminFindManyUser(
      variables: AdminFindManyUserQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{ data: AdminFindManyUserQuery; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindManyUserQuery>(AdminFindManyUserDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindManyUser',
        'query',
      )
    },
    adminFindOneUser(
      variables: AdminFindOneUserQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{ data: AdminFindOneUserQuery; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindOneUserQuery>(AdminFindOneUserDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindOneUser',
        'query',
      )
    },
    adminUpdateUser(
      variables: AdminUpdateUserMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{ data: AdminUpdateUserMutation; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminUpdateUserMutation>(AdminUpdateUserDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminUpdateUser',
        'mutation',
      )
    },
    userFindManyUser(
      variables: UserFindManyUserQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{ data: UserFindManyUserQuery; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserFindManyUserQuery>(UserFindManyUserDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userFindManyUser',
        'query',
      )
    },
    userFindOneUser(
      variables: UserFindOneUserQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{ data: UserFindOneUserQuery; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserFindOneUserQuery>(UserFindOneUserDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userFindOneUser',
        'query',
      )
    },
    userUpdateUser(
      variables: UserUpdateUserMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{ data: UserUpdateUserMutation; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserUpdateUserMutation>(UserUpdateUserDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userUpdateUser',
        'mutation',
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
