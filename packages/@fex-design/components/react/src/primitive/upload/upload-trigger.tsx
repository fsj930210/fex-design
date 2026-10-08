import { uploadTriggerClassName } from '@fex-design/components-styles/upload'
import type { ButtonHTMLAttributes, ReactNode, Ref } from 'react'
import { Button } from '../button/button'
import { useUploadContext } from './upload-context'

export interface UploadTriggerRenderProps {
  props: ButtonHTMLAttributes<HTMLButtonElement>
  ref?: Ref<HTMLButtonElement> | undefined
}

export function UploadTrigger({
  children,
}: {
  children?: ReactNode | ((value: UploadTriggerRenderProps) => ReactNode)
}) {
  const { upload, inputRef, inputId, invalid } = useUploadContext()
  const disabled = upload.getOptions().disabled
  const triggerProps: ButtonHTMLAttributes<HTMLButtonElement> = {
    type: 'button',
    disabled,
    'aria-controls': inputId,
    'aria-invalid': invalid || undefined,
    className: uploadTriggerClassName(),
    onClick: () => inputRef.current?.click(),
  }
  if (typeof children === 'function') return children({ props: triggerProps, ref: undefined })
  return <Button {...triggerProps}>{children}</Button>
}
