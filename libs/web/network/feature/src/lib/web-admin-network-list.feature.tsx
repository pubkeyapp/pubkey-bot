import { Button, Group } from '@mantine/core'
import { Network } from '@pubkey-bot/sdk'
import { UiBack, UiAdminPage, UiAlert, UiLoader, UiPagination, UiSearchField } from '@pubkey-bot/web/ui/core'
import { useAdminFindManyNetwork } from '@pubkey-bot/web/network/data-access'
import { AdminUiNetworkTable } from '@pubkey-bot/web/network/ui'
import { Link } from 'react-router-dom'

export function WebAdminNetworkListFeature() {
  const { deleteNetwork, pagination, query, setSearch } = useAdminFindManyNetwork()

  return (
    <UiAdminPage
      title="Networks"
      leftAction={<UiBack />}
      rightAction={
        <Button component={Link} to="create">
          Create
        </Button>
      }
    >
      <Group>
        <UiSearchField placeholder="Search network" setSearch={setSearch} />
      </Group>

      {query.isLoading ? (
        <UiLoader />
      ) : query?.data?.paging?.data?.length ? (
        <AdminUiNetworkTable
          deleteNetwork={(network) => {
            if (!window.confirm('Are you sure?')) return
            return deleteNetwork(network.id)
          }}
          networks={query?.data?.paging?.data ?? []}
        />
      ) : (
        <UiAlert message="No results" />
      )}

      <UiPagination pagination={pagination} />
    </UiAdminPage>
  )
}
