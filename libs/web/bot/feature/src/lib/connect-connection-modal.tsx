import { Button, Text } from '@mantine/core'
import { AdminCreateConnectionInput, Bot, DiscordRoleConnection } from '@pubkey-bot/sdk'
import { useAdminFindManyCollection } from '@pubkey-bot/web/collection/data-access'
import { WebUiCollectionAvatar } from '@pubkey-bot/web/collection/ui'
import { UiGroup, UiStack } from '@pubkey-bot/web/ui/core'

export function ConnectConnectionModal({
  bot,
  connection,
  submit,
}: {
  bot: Bot
  connection: DiscordRoleConnection
  submit: (data: AdminCreateConnectionInput) => Promise<void>
}) {
  const { items } = useAdminFindManyCollection()

  return (
    <UiStack>
      {items.map((item) => (
        <UiGroup key={item.id}>
          <UiGroup>
            <WebUiCollectionAvatar collection={item} size={64} />
            <Text size="lg">{item.name}</Text>
          </UiGroup>
          <Button onClick={() => submit({ botId: bot.id, key: connection.key, collectionId: item.id })}>Connect</Button>
        </UiGroup>
      ))}
    </UiStack>
  )
}
