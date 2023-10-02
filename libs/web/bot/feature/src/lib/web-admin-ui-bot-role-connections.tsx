import { Button, Select, Table, TextInput } from '@mantine/core'
import { AddBotRoleConnectionInput, Bot, DiscordRoleConnectionType, getEnumOptions } from '@pubkey-bot/sdk'
import { useManagerGetBotRoleConnections } from '@pubkey-bot/web/bot/data-access'
import { useWebSdk } from '@pubkey-bot/web/shell/data-access'
import { UiActionIcon, UiAlert, UiCard, UiLoader, UiStack, UiWarn } from '@pubkey-bot/web/ui/core'
import { showNotificationError, showNotificationSuccess } from '@pubkey-bot/web/ui/notifications'
import { IconTrash } from '@tabler/icons-react'
import { useMemo, useState } from 'react'

export function WebAdminUiBotRoleConnections({ bot }: { bot: Bot }) {
  const sdk = useWebSdk()
  const query = useManagerGetBotRoleConnections({ botId: bot.id })
  const items = query.data?.items || []
  const [name, setName] = useState<string>('')
  const [type, setType] = useState<DiscordRoleConnectionType | undefined>(undefined)
  const [description, setDescription] = useState<string>('')
  const [saving, setSaving] = useState<boolean>(false)
  const [deleting, setDeleting] = useState<boolean>(false)

  const input: AddBotRoleConnectionInput | undefined = useMemo(() => {
    if (!type) return undefined
    return {
      name,
      type,
      description,
      key: nameToKey(name),
    }
  }, [bot.id, name, type, description])

  const valid = useMemo(() => {
    if (!input) return false
    const hasAllFields = input.name && input.type && input.description && input.key
    const hasNoDuplicates = !items.find((item) => item.key === input.key)

    return hasAllFields && hasNoDuplicates
  }, [input])

  const maxItemsReached = useMemo(() => items.length >= 5, [items])

  if (query.isLoading) {
    return <UiLoader />
  }

  if (!query.data) {
    return <UiAlert message="Bot not found." />
  }

  return (
    <UiStack spacing="xl">
      <UiCard>
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Description</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {query.data?.items?.map((item) => (
              <tr key={item.key}>
                <td>{item.type}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td align="right">
                  <UiActionIcon
                    loading={deleting}
                    size="xs"
                    color="red"
                    icon={IconTrash}
                    onClick={() => {
                      if (!window.confirm('Are you sure?')) return
                      setDeleting(true)
                      sdk
                        .managerRemoveBotRoleConnection({ botId: bot.id, key: item.key })
                        .then(async (res) => {
                          showNotificationSuccess(`Role ${item.name} removed.`)
                          await query.refetch()
                        })
                        .catch((err) => {
                          showNotificationError(`Error removing role ${item.name}.`)
                        })
                        .finally(() => setDeleting(false))
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </UiCard>

      <UiCard>
        <UiStack>
          {maxItemsReached ? (
            <UiWarn message="You reached the maximum of 5 role connections." />
          ) : (
            <UiAlert message={`You can add ${5 - items.length} more role connections.`} />
          )}
          <Select
            disabled={maxItemsReached}
            label="Type"
            placeholder="Type"
            data={getEnumOptions(DiscordRoleConnectionType)}
            value={type}
            onChange={(e) => setType(e as DiscordRoleConnectionType)}
          />
          <TextInput
            disabled={maxItemsReached}
            label="Name"
            maxLength={100}
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
          />
          <TextInput
            disabled={maxItemsReached}
            label="Description"
            placeholder="Description"
            maxLength={200}
            value={description}
            onChange={(e) => setDescription(e.currentTarget.value)}
          />
          <Button
            loading={saving}
            disabled={!valid || !input}
            onClick={() => {
              if (!input) return
              setSaving(true)
              sdk
                .managerAddBotRoleConnection({ botId: bot.id, input })
                .then(async (res) => {
                  showNotificationSuccess(`Role ${input.name} added.`)
                  await query.refetch()
                  setName('')
                  setType(undefined)
                  setDescription('')
                })
                .catch((err) => {
                  showNotificationError(`Error adding role ${input.name}.`)
                })
                .finally(() => {
                  setSaving(false)
                })
            }}
          >
            Add Role
          </Button>
        </UiStack>
      </UiCard>
    </UiStack>
  )
}

function nameToKey(name: string): string {
  // Remove characters that are not a-z, 0-9, or _
  let key = name.toLowerCase().replace(/[^a-z0-9_]/g, '')

  // Ensure the key is at most 50 characters long
  return key.substring(0, 50)
}
