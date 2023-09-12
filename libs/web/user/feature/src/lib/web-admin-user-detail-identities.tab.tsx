import { Button, Group } from '@mantine/core'
import { modals } from '@mantine/modals'
import { useAdminIdentities } from '@pubkey-bot/web/identity/data-access'
import { AuthUiIdentityCreateForm, IdentityUiAdminTable } from '@pubkey-bot/web/identity/ui'
import { UiAlert, UiLoader, UiStack } from '@pubkey-bot/web/ui/core'

export function WebAdminUserDetailIdentitiesTab({ userId }: { userId: string }) {
  const { identities, createIdentity, deleteIdentity, query } = useAdminIdentities({ ownerId: userId })

  if (query.isLoading) return <UiLoader />

  return (
    <UiStack>
      {identities?.length ? (
        <IdentityUiAdminTable identities={identities ?? []} deleteIdentity={deleteIdentity} />
      ) : (
        <UiAlert message="No identities found" />
      )}
      <Group position="right">
        <Button
          onClick={() => {
            modals.open({
              title: 'Add Identity',
              children: <AuthUiIdentityCreateForm submit={createIdentity} />,
            })
          }}
        >
          Add Identity
        </Button>
      </Group>
    </UiStack>
  )
}
