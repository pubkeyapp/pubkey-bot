import { Button, Group } from '@mantine/core'
import { AdminUpdateCollectionInput, Collection } from '@pubkey-bot/sdk'
import { formFieldText, formFieldTextarea, UiForm, UiFormField } from '@pubkey-bot/web/ui/core'

export interface AdminUiUpdateCollectionFormProps {
  submit: (res: AdminUpdateCollectionInput) => Promise<boolean>
  collection: Collection
}

export function AdminUiUpdateCollectionForm({ submit, collection }: AdminUiUpdateCollectionFormProps) {
  const model: AdminUpdateCollectionInput = {
    description: collection.description ?? '',
    imageUrl: collection.imageUrl ?? '',
    metadataUrl: collection.metadataUrl ?? '',
    name: collection.name ?? '',
    symbol: collection.symbol ?? '',
  }

  const fields: UiFormField<AdminUpdateCollectionInput>[] = [
    formFieldText('name', { label: 'Name' }),
    formFieldText('symbol', { label: 'Symbol' }),
    formFieldTextarea('description', { label: 'Description' }),
    formFieldText('imageUrl', { label: 'Image URL' }),
    formFieldText('metadataUrl', { label: 'Metadata URL' }),
  ]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as AdminUpdateCollectionInput)}>
      <Group position="right">
        <Button type="submit">Save</Button>
      </Group>
    </UiForm>
  )
}
