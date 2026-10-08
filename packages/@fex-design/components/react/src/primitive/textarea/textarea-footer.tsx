import { textareaFooterClassName } from '@fex-design/components-styles/textarea'
import { cn } from '@fex-design/utils'
import type { ComponentProps, Ref } from 'react'

export interface TextareaFooterProps extends ComponentProps<'div'> {
  ref?: Ref<HTMLDivElement> | undefined
}

export function TextareaFooter({ className, ref, ...props }: TextareaFooterProps) {
  return (
    <div
      {...props}
      ref={ref}
      data-slot="textarea-footer"
      className={cn(textareaFooterClassName, className)}
    />
  )
}
