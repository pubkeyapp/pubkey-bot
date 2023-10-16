import { Badge, Group, SimpleGrid, Text } from '@mantine/core'
import { Bot } from '@pubkey-bot/sdk'
import { useUserGetBotRoleConnections } from '@pubkey-bot/web/bot/data-access'
import { WebUiCollectionAvatar } from '@pubkey-bot/web/collection/ui'
import { UiCard, UiGroup, UiLoader, UiStack, UiWarn } from '@pubkey-bot/web/ui/core'

export function WebBotOverviewFeature({ bot }: { bot: Bot }) {
  const { query, items } = useUserGetBotRoleConnections({ botId: bot.id })

  return (
    <UiStack>
      {query.isLoading ? (
        <UiStack>
          <UiWarn message={'Loading assets'} />
          <UiLoader />
        </UiStack>
      ) : (
        <SimpleGrid cols={2} spacing="md">
          {items.map((item) => (
            <UiCard key={item.key}>
              <UiGroup>
                <Group>
                  {item.collection ? <WebUiCollectionAvatar size={36} collection={item.collection} /> : null}
                  <Text weight="bold">{item.name}</Text>
                </Group>
                <Badge color={item.metadata ? 'green' : 'red'} variant="filled" size="lg">
                  {item.metadata}
                </Badge>
              </UiGroup>
            </UiCard>
          ))}
        </SimpleGrid>
      )}
    </UiStack>
  )
}
