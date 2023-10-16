import { Button } from '@mantine/core'
import { useAdminFindManyConnection } from '@pubkey-bot/web/connection/data-access'
import { AdminUiConnectionTable } from '@pubkey-bot/web/connection/ui'
import { UiAdminPage, UiAlert, UiBack, UiLoader, UiPagination } from '@pubkey-bot/web/ui/core'
import { Link } from 'react-router-dom'

export function WebAdminConnectionListFeature() {
  const { deleteConnection, pagination, query } = useAdminFindManyConnection({ botId: '' })

  return (
    <UiAdminPage
      title="Connections"
      leftAction={<UiBack />}
      rightAction={
        <Button component={Link} to="create">
          Create
        </Button>
      }
    >
      {query.isLoading ? (
        <UiLoader />
      ) : query?.data?.paging?.data?.length ? (
        <AdminUiConnectionTable
          deleteConnection={(connection) => {
            if (!window.confirm('Are you sure?')) return
            return deleteConnection(connection.id)
          }}
          connections={query?.data?.paging?.data ?? []}
        />
      ) : (
        <UiAlert message="No results" />
      )}

      <UiPagination pagination={pagination} />
    </UiAdminPage>
  )
}
