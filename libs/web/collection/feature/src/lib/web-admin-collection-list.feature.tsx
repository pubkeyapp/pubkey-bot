import { Button, Group } from '@mantine/core'
import { Collection } from '@pubkey-bot/sdk'
import { UiBack, UiAdminPage, UiAlert, UiLoader, UiPagination, UiSearchField } from '@pubkey-bot/web/ui/core'
import { useAdminFindManyCollection } from '@pubkey-bot/web/collection/data-access'
import { AdminUiCollectionTable } from '@pubkey-bot/web/collection/ui'
import { Link } from 'react-router-dom'

export function WebAdminCollectionListFeature() {
  const { deleteCollection, pagination, query, setSearch } = useAdminFindManyCollection()

  return (
    <UiAdminPage
      title="Collections"
      leftAction={<UiBack />}
      rightAction={
        <Button component={Link} to="create">
          Create
        </Button>
      }
    >
      <Group>
        <UiSearchField placeholder="Search collection" setSearch={setSearch} />
      </Group>

      {query.isLoading ? (
        <UiLoader />
      ) : query?.data?.paging?.data?.length ? (
        <AdminUiCollectionTable
          deleteCollection={(collection) => {
            if (!window.confirm('Are you sure?')) return
            return deleteCollection(collection.id)
          }}
          collections={query?.data?.paging?.data ?? []}
        />
      ) : (
        <UiAlert message="No results" />
      )}

      <UiPagination pagination={pagination} />
    </UiAdminPage>
  )
}
