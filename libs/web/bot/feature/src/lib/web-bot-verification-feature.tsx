import { Badge, Group, Text } from '@mantine/core'
import { Bot } from '@pubkey-bot/sdk'
import { userUserGetBotCollectionAssets } from '@pubkey-bot/web/bot/data-access'
import { WebUiCollectionAvatar } from '@pubkey-bot/web/collection/ui'
import { UiCard, UiGroup, UiLoader, UiStack, UiWarn } from '@pubkey-bot/web/ui/core'

export function WebBotVerificationFeature({ bot }: { bot: Bot }) {
  const { query, items } = userUserGetBotCollectionAssets({ botId: bot.id })

  return (
    <UiStack>
      <UiCard>
        {query.isLoading ? (
          <UiStack>
            <UiWarn message={'Loading assets'} />
            <UiLoader />
          </UiStack>
        ) : (
          <UiStack>
            {items.map((item) => (
              <UiGroup key={item.id}>
                <Group>
                  <WebUiCollectionAvatar collection={item} />
                  <Text size="xl">{item.name}</Text>
                </Group>
                <Group>
                  <Badge color={item.assets?.length ? 'green' : 'red'} variant="filled" size="lg">
                    {item.assets?.length} assets
                  </Badge>
                </Group>
              </UiGroup>
            ))}
          </UiStack>
        )}
      </UiCard>

      {/*<UiDebug data={{ items }} open />*/}
    </UiStack>
  )
}
