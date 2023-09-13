import { Avatar, Grid, NavLink } from '@mantine/core'
import { Bot, DiscordServer } from '@pubkey-bot/sdk'
import { useManagerGetBotServers } from '@pubkey-bot/web/bot/data-access'
import { UiAlert, UiLoader } from '@pubkey-bot/web/ui/core'
import { IconChevronRight } from '@tabler/icons-react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'

import { WebAdminUiBotServer } from './web-admin-ui-bot-server'

export function WebAdminUiBotServers({ bot }: { bot: Bot }) {
  const query = useManagerGetBotServers({ botId: bot.id })
  const { pathname } = useLocation()
  if (query.isLoading) {
    return <UiLoader />
  }
  if (!query.data) {
    return <UiAlert message="Bot not found." />
  }
  const items: DiscordServer[] = query.data?.items ?? []

  return (
    <div>
      <Grid>
        <Grid.Col span={3}>
          {items?.map((item) => (
            <NavLink
              component={Link}
              to={`./${item.id}`}
              key={item.id}
              label={item.name}
              icon={<Avatar src={item.icon} size="2rem" />}
              rightSection={<IconChevronRight size="0.8rem" stroke={1.5} />}
              active={pathname.includes(item.id)}
              variant="filled"
            />
          ))}
        </Grid.Col>
        <Grid.Col span={9}>
          <Routes>
            <Route index element={<UiAlert message={`Select a server`} />} />
            <Route path=":serverId" element={<WebAdminUiBotServer botId={bot.id} />} />
          </Routes>
        </Grid.Col>
      </Grid>
    </div>
  )
}
