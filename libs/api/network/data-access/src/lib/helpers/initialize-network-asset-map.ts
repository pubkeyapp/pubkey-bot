import { NetworkType, Prisma } from '@prisma/client'
import { CollectionAsset } from '@pubkey-bot/api/collection/data-access'

export type NetworkAssetMap = Record<NetworkType, CollectionAsset[]>

export function initializeNetworkAssetMap(networks: NetworkType[]): NetworkAssetMap {
  return networks.reduce((acc, network) => ({ ...acc, [network]: [] }), {} as NetworkAssetMap)
}
