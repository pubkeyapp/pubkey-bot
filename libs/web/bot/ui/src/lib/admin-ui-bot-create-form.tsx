import { AdminCreateBotInput } from '@pubkey-bot/sdk'
import { formFieldText, UiForm, UiFormField } from '@pubkey-bot/web/ui/core'
import { ReactNode } from 'react'

export interface AdminUiCreateBotFormProps {
  children?: ReactNode
  submit: (res: AdminCreateBotInput) => Promise<boolean>
}

export function AdminUiCreateBotForm({ children, submit }: AdminUiCreateBotFormProps) {
  const model: AdminCreateBotInput = {
    clientId: '',
    clientSecret: '',
    token: '',
  }

  const fields: UiFormField<AdminCreateBotInput>[] = [
    formFieldText('clientId', { label: 'Client ID', required: true }),
    formFieldText('clientSecret', { label: 'Client Secret', required: true }),
    formFieldText('token', { label: 'Token', required: true }),
  ]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as AdminCreateBotInput)}>
      {children}
    </UiForm>
  )
}
