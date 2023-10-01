import { AdminCreateCollectionInput, getEnumOptions, NetworkType } from '@pubkey-bot/sdk'
import { formFieldSelect, formFieldText, UiForm, UiFormField } from '@pubkey-bot/web/ui/core'
import { ReactNode } from 'react'

export interface AdminUiCreateCollectionFormProps {
  children?: ReactNode
  submit: (res: AdminCreateCollectionInput) => Promise<boolean>
}

export function AdminUiCreateCollectionForm({ children, submit }: AdminUiCreateCollectionFormProps) {
  const model: AdminCreateCollectionInput = {
    account: '',
    name: '',
    network: NetworkType.SolanaMainnet,
  }

  const fields: UiFormField<AdminCreateCollectionInput>[] = [
    formFieldText('name', { label: 'Name', required: true }),
    formFieldText('account', { label: 'Account', required: true }),
    formFieldSelect('network', { label: 'Network', required: true, options: getEnumOptions(NetworkType) }),
  ]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as AdminCreateCollectionInput)}>
      {children}
    </UiForm>
  )
}
