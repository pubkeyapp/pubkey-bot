import { IdentityProvider } from '@pubkey-bot/sdk'
import { useWebSdk } from '@pubkey-bot/web/shell/data-access'
import { showNotificationError, showNotificationSuccess } from '@pubkey-bot/web/ui/notifications'
import { useWallet } from '@solana/wallet-adapter-react'
import { createContext, ReactNode, useContext } from 'react'
import { useCreateSignature } from './use-create-signature'

export interface LinkSignOptions {
  useLedger: boolean
  publicKey: string
}
export interface IdentityProviderSolanaContext {
  linkAndSign: (input: LinkSignOptions) => Promise<void>
  verifyAndSign: (input: LinkSignOptions) => Promise<void>
}

const Context = createContext<IdentityProviderSolanaContext>({} as IdentityProviderSolanaContext)

export function IdentityProviderSolana({ children, refresh }: { children: ReactNode; refresh: () => void }) {
  const sdk = useWebSdk()
  const { signMessage } = useWallet()
  const createSignature = useCreateSignature()
  async function linkIdentity({ publicKey }: { publicKey: string }) {
    return sdk
      .userLinkIdentity({ input: { provider: IdentityProvider.Solana, providerId: publicKey } })
      .then((res) => {
        showNotificationSuccess('Identity linked')
        refresh()
      })
      .catch((err) => {
        console.log('Error linking identity', err)
        showNotificationError('Error linking identity')
      })
  }

  async function requestChallenge({ publicKey }: { publicKey: string }) {
    return sdk
      .userRequestIdentityChallenge({ input: { provider: IdentityProvider.Solana, providerId: publicKey } })
      .then((res) => {
        if (!res.data.challenge) {
          showNotificationError('Error linking identity')
          return
        }
        return res.data.challenge
      })
      .catch((err) => {
        console.log('error linking identity', err)
        showNotificationError('Error linking identity')
      })
  }

  async function signChallenge({ challenge, publicKey, useLedger }: LinkSignOptions & { challenge: string }) {
    if (!challenge || signMessage === undefined) {
      return
    }

    const signature = await createSignature({ challenge, publicKey, useLedger })
    if (!signature) {
      throw new Error('No signature')
    }

    return sdk
      .userVerifyIdentityChallenge({
        input: {
          provider: IdentityProvider.Solana,
          providerId: publicKey,
          challenge: challenge,
          signature,
          useLedger,
        },
      })
      .then((res) => {
        showNotificationSuccess('Identity verified')
        refresh()
      })
      .catch((err) => {
        console.log('error verifying identity', err)
        showNotificationError('Error verifying identity')
      })
  }

  async function verifyAndSign({ useLedger, publicKey }: LinkSignOptions) {
    // Request challenge
    const request = await requestChallenge({ publicKey })
    if (!request?.challenge) {
      return
    }
    // Sign challenge
    await signChallenge({ challenge: request.challenge, publicKey, useLedger })
  }

  async function linkAndSign({ useLedger, publicKey }: LinkSignOptions) {
    // Link identity
    await linkIdentity({ publicKey })
    // Verify and sign
    await verifyAndSign({ useLedger, publicKey })
  }

  return <Context.Provider value={{ linkAndSign, verifyAndSign }}>{children}</Context.Provider>
}

export function useIdentitySolana() {
  return useContext(Context)
}
