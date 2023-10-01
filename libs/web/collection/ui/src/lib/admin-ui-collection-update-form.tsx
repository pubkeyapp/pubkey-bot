import { Button, Group } from '@mantine/core'
import { AdminUpdateCollectionInput, Collection } from '@pubkey-bot/sdk'
import { formFieldText, UiForm, UiFormField } from '@pubkey-bot/web/ui/core'

export interface AdminUiUpdateCollectionFormProps {
  submit: (res: AdminUpdateCollectionInput) => Promise<boolean>
  collection: Collection
}

export function AdminUiUpdateCollectionForm({ submit, collection }: AdminUiUpdateCollectionFormProps) {
  const model: AdminUpdateCollectionInput = {
    name: collection.name ?? '',
  }

  const fields: UiFormField<AdminUpdateCollectionInput>[] = [formFieldText('name', { label: 'Name' })]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as AdminUpdateCollectionInput)}>
      <Group position="right">
        <Button type="submit">Save</Button>
      </Group>
    </UiForm>
  )
}
