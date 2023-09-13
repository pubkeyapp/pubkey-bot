import { Button, Group } from '@mantine/core'
import { Bot } from '@pubkey-bot/sdk'
import { UiBack, UiAdminPage, UiAlert, UiLoader, UiPagination, UiSearchField } from '@pubkey-bot/web/ui/core'
import { useAdminFindManyBot } from '@pubkey-bot/web/bot/data-access'
import { AdminUiBotTable } from '@pubkey-bot/web/bot/ui'
import { Link } from 'react-router-dom'

export function WebAdminBotListFeature() {
  const { deleteBot, pagination, query, setSearch } = useAdminFindManyBot()

  return (
    <UiAdminPage
      title="Bots"
      leftAction={<UiBack />}
      rightAction={
        <Button component={Link} to="create">
          Create
        </Button>
      }
    >
      <Group>
        <UiSearchField placeholder="Search bot" setSearch={setSearch} />
      </Group>

      {query.isLoading ? (
        <UiLoader />
      ) : query?.data?.paging?.data?.length ? (
        <AdminUiBotTable
          deleteBot={(bot) => {
            if (!window.confirm('Are you sure?')) return
            return deleteBot(bot.id)
          }}
          bots={query?.data?.paging?.data ?? []}
        />
      ) : (
        <UiAlert message="No results" />
      )}

      <UiPagination pagination={pagination} />
    </UiAdminPage>
  )
}
