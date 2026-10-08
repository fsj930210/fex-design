import { uploadTriggerClassName } from '@fex-design/components-styles/upload'
import type { JSX } from 'solid-js'
import { useUploadContext } from './context'

export interface UploadTriggerBindings {
  type: 'button'
  disabled: boolean
  'aria-controls': string
  'aria-invalid': boolean | undefined
  class: string
  onClick(): void
}

export interface UploadTriggerProps {
  children(value: { props: UploadTriggerBindings }): JSX.Element
}

export function UploadTrigger(props: UploadTriggerProps) {
  const { upload, input, inputId, invalid } = useUploadContext()
  const triggerProps: UploadTriggerBindings = {
    type: 'button',
    disabled: upload.getOptions().disabled === true,
    'aria-controls': inputId,
    get 'aria-invalid'() {
      return invalid() || undefined
    },
    class: uploadTriggerClassName(),
    onClick: () => {
      input()?.click()
    },
  }
  return props.children({ props: triggerProps })
}
