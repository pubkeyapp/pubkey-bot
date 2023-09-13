import { Button, Group } from '@mantine/core'
import { AdminUpdateBotInput, Bot } from '@pubkey-bot/sdk'
import { formFieldText, UiForm, UiFormField } from '@pubkey-bot/web/ui/core'

export interface AdminUiUpdateBotFormProps {
  submit: (res: AdminUpdateBotInput) => Promise<boolean>
  bot: Bot
}

export function AdminUiUpdateBotForm({ submit, bot }: AdminUiUpdateBotFormProps) {
  const model: AdminUpdateBotInput = {
    name: bot.name ?? '',
  }

  const fields: UiFormField<AdminUpdateBotInput>[] = [formFieldText('name', { label: 'Name' })]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as AdminUpdateBotInput)}>
      <Group position="right">
        <Button type="submit">Save</Button>
      </Group>
    </UiForm>
  )
}
