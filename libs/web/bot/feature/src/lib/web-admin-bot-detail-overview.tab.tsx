import { Accordion, Anchor, rem, Text, TextInput, useMantineTheme } from '@mantine/core'
import { Bot } from '@pubkey-bot/sdk'
import { useAdminFindOneBot } from '@pubkey-bot/web/bot/data-access'
import { UiAlert, UiCopy, UiDebug, UiStack } from '@pubkey-bot/web/ui/core'
import { IconCheck, IconClock, IconExternalLink } from '@tabler/icons-react'
import { useMemo } from 'react'

export function WebAdminBotDetailOverviewTab({ botId }: { botId: string }) {
  const { bot, startBot, stopBot } = useAdminFindOneBot({ botId })

  return bot ? (
    <UiStack>
      <Text size="xl" weight={700}>
        Configuration
      </Text>
      <WebUiBotVerification bot={bot} />
    </UiStack>
  ) : (
    <UiAlert message="Bot not found." />
  )
}

export function WebUiBotVerification({ bot }: { bot: Bot }) {
  const theme = useMantineTheme()
  const defaultValue = useMemo(
    () => [bot.verificationUrlSet ? '' : 'verificationUrl', bot.redirectUrlSet ? '' : 'redirectUrl'],
    [bot],
  )
  const getColor = (color: string) => theme.colors[color][theme.colorScheme === 'dark' ? 5 : 7]

  const validIcon = <IconCheck size={rem(20)} color={getColor('green')} />
  const invalidIcon = <IconClock size={rem(20)} color={getColor('yellow')} />
  return (
    <Accordion variant="contained" multiple defaultValue={defaultValue}>
      <Accordion.Item value="verificationUrl">
        <Accordion.Control icon={bot.verificationUrlSet ? validIcon : invalidIcon}>
          Linked Roles Verification URLs
        </Accordion.Control>
        <Accordion.Panel>
          <LinkSection
            value={bot.verificationUrl}
            url={bot.developersUrl + '/information'}
            label="General Information"
            section="Linked Roles Verification Urls"
            type="field"
          />
        </Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item value="redirectUrl">
        <Accordion.Control icon={bot.redirectUrlSet ? validIcon : invalidIcon}>OAuth2 Redirects</Accordion.Control>
        <Accordion.Panel>
          <LinkSection
            value={bot.redirectUrl}
            url={bot.developersUrl + '/oauth2/general'}
            label="OAuth2"
            section="Redirects"
            type="section"
          />
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  )
}

function LinkSection({
  label,
  section,
  type,
  url,
  value,
}: {
  label: string
  section: string
  type: 'field' | 'section'
  url: string
  value: string
}) {
  return (
    <UiStack>
      <Text>
        On the{' '}
        <Anchor fw="bold" href={url} target="_blank" rel="noopener noreferrer">
          {label} <IconExternalLink size={16} />
        </Anchor>{' '}
        page, add the following URL to the <strong>{section}</strong> {type}:
      </Text>
      <TextInput value={value} readOnly rightSection={<UiCopy tooltip={`Copy  to clipboard`} text={value} />} />
    </UiStack>
  )
}
