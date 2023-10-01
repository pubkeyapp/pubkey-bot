import { Button, Group } from '@mantine/core'
import { AdminUpdateNetworkInput, Network } from '@pubkey-bot/sdk'
import { formFieldText, UiForm, UiFormField } from '@pubkey-bot/web/ui/core'

export interface AdminUiUpdateNetworkFormProps {
  submit: (res: AdminUpdateNetworkInput) => Promise<boolean>
  network: Network
}

export function AdminUiUpdateNetworkForm({ submit, network }: AdminUiUpdateNetworkFormProps) {
  const model: AdminUpdateNetworkInput = {
    name: network.name ?? '',
  }

  const fields: UiFormField<AdminUpdateNetworkInput>[] = [formFieldText('name', { label: 'Name' })]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as AdminUpdateNetworkInput)}>
      <Group position="right">
        <Button type="submit">Save</Button>
      </Group>
    </UiForm>
  )
}
