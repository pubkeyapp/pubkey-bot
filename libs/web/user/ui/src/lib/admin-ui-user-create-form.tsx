import { AdminCreateUserInput } from '@pubkey-bot/sdk'
import { formFieldPassword, formFieldText, UiForm, UiFormField } from '@pubkey-bot/web/ui/core'
import { ReactNode } from 'react'

export interface AdminUiCreateUserFormProps {
  children?: ReactNode
  submit: (res: AdminCreateUserInput) => Promise<boolean>
}

export function AdminUiCreateUserForm({ children, submit }: AdminUiCreateUserFormProps) {
  const model: AdminCreateUserInput = {
    username: '',
    password: '',
  }

  const fields: UiFormField<AdminCreateUserInput>[] = [
    formFieldText('username', {
      label: 'Username',
    }),
    formFieldPassword('password', {
      label: 'Password',
    }),
  ]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as AdminCreateUserInput)}>
      {children}
    </UiForm>
  )
}
