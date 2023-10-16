import { Avatar, Group } from '@mantine/core'
import { useUserFindOneBot } from '@pubkey-bot/web/bot/data-access'
import { UiError, UiLoader, UiPageHeader, UiStack, UiTabRoutes } from '@pubkey-bot/web/ui/core'
import { useParams } from 'react-router-dom'
import { WebBotVerificationFeature } from './web-bot-verification-feature'

export function WebBotDetailFeature() {
  const { botId } = useParams<{ botId: string }>() as { botId: string }
  const { query, bot } = useUserFindOneBot({ botId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!bot) {
    return <UiError message="Bot not found." />
  }

  return (
    <UiStack>
      <UiPageHeader
        title={
          <Group spacing="sm">
            <Avatar src={bot?.avatarUrl} />
            {bot?.name}
          </Group>
        }
      />
      <UiTabRoutes
        tabs={[
          {
            value: 'verification',
            label: 'Verification',
            component: <WebBotVerificationFeature bot={bot} />,
          },
        ]}
      />
    </UiStack>
  )
}
