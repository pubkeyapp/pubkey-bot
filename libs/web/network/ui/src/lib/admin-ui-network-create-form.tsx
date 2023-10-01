import { AdminCreateNetworkInput, getEnumOptions, NetworkType } from '@pubkey-bot/sdk'
import { formFieldSelect, formFieldText, UiForm, UiFormField } from '@pubkey-bot/web/ui/core'
import { ReactNode } from 'react'

export interface AdminUiCreateNetworkFormProps {
  children?: ReactNode
  submit: (res: AdminCreateNetworkInput) => Promise<boolean>
}

export function AdminUiCreateNetworkForm({ children, submit }: AdminUiCreateNetworkFormProps) {
  const model: AdminCreateNetworkInput = {
    name: '',
    endpoint: '',
    type: NetworkType.SolanaMainnet,
  }

  const fields: UiFormField<AdminCreateNetworkInput>[] = [
    formFieldText('name', { label: 'Name', required: true }),
    formFieldText('endpoint', { label: 'Endpoint', required: true }),
    formFieldSelect('type', { label: 'Type', required: true, options: getEnumOptions(NetworkType) }),
  ]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as AdminCreateNetworkInput)}>
      {children}
    </UiForm>
  )
}
