import { Group, Text } from '@mantine/core'
import { Bot } from '@pubkey-bot/sdk'
import { userUserGetBotCollectionAssets, useUserGetBotRoleConnections } from '@pubkey-bot/web/bot/data-access'
import { WebUiCollectionAvatar } from '@pubkey-bot/web/collection/ui'
import { UiCard, UiDebug, UiGroup, UiLoader, UiStack, UiWarn } from '@pubkey-bot/web/ui/core'

export function WebBotVerificationFeatureX({ bot }: { bot: Bot }) {
  const { query, items } = useUserGetBotRoleConnections({ botId: bot.id })

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
            <UiDebug data={{ items }} open />
            {/*{items.map((item) => (*/}
            {/*  <UiGroup key={item.id}>*/}
            {/*    <Group>*/}
            {/*      <WebUiCollectionAvatar collection={item} />*/}
            {/*      <Text size="xl">{item.name}</Text>*/}
            {/*    </Group>*/}
            {/*    <Group>*/}
            {/*      {item.assets?.length ? <Text>{item.assets?.length} assets</Text> : <Text>No assets</Text>}*/}
            {/*    </Group>*/}
            {/*  </UiGroup>*/}
            {/*))}*/}
          </UiStack>
        )}
      </UiCard>

      {/*<UiDebug data={{ items }} open />*/}
    </UiStack>
  )
}

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
                  {item.assets?.length ? <Text>{item.assets?.length} assets</Text> : <Text>No assets</Text>}
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
