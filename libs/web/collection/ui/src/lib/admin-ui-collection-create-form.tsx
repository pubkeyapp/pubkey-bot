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
    network: NetworkType.SolanaMainnet,
  }

  const fields: UiFormField<AdminCreateCollectionInput>[] = [
    formFieldSelect('network', { label: 'Network', required: true, options: getEnumOptions(NetworkType) }),
    formFieldText('account', { label: 'Account', required: true }),
  ]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as AdminCreateCollectionInput)}>
      {children}
    </UiForm>
  )
}
