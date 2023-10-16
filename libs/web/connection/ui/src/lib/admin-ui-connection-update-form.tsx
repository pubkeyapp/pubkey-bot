import { Button, Group } from '@mantine/core'
import { AdminUpdateConnectionInput, Connection } from '@pubkey-bot/sdk'
import { formFieldText, UiForm, UiFormField } from '@pubkey-bot/web/ui/core'

export interface AdminUiUpdateConnectionFormProps {
  submit: (res: AdminUpdateConnectionInput) => Promise<boolean>
  connection: Connection
}

export function AdminUiUpdateConnectionForm({ submit, connection }: AdminUiUpdateConnectionFormProps) {
  const model: AdminUpdateConnectionInput = {
    key: connection.key ?? '',
  }

  const fields: UiFormField<AdminUpdateConnectionInput>[] = [formFieldText('key', { label: 'Key' })]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as AdminUpdateConnectionInput)}>
      <Group position="right">
        <Button type="submit">Save</Button>
      </Group>
    </UiForm>
  )
}
