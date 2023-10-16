import { AdminCreateConnectionInput } from '@pubkey-bot/sdk'
import { formFieldText, UiForm, UiFormField } from '@pubkey-bot/web/ui/core'
import { ReactNode } from 'react'

export interface AdminUiCreateConnectionFormProps {
  children?: ReactNode
  submit: (res: AdminCreateConnectionInput) => Promise<boolean>
}

export function AdminUiCreateConnectionForm({ children, submit }: AdminUiCreateConnectionFormProps) {
  const model: AdminCreateConnectionInput = {
    key: '',
    botId: '',
    collectionId: '',
  }

  const fields: UiFormField<AdminCreateConnectionInput>[] = [
    formFieldText('key', { label: 'Key', required: true }),
    formFieldText('botId', { label: 'Bot ID', required: true }),
    formFieldText('collectionId', { label: 'Collection ID', required: true }),
  ]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as AdminCreateConnectionInput)}>
      {children}
    </UiForm>
  )
}
