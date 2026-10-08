import { textareaFooterClassName } from '@fex-design/components-styles/textarea'
import { cn } from '@fex-design/utils'
import type { JSX, ParentProps } from 'solid-js'

export function TextareaFooter(props: ParentProps<JSX.HTMLAttributes<HTMLDivElement>>) {
  return (
    <div {...props} data-slot="textarea-footer" class={cn(textareaFooterClassName, props.class)}>
      {props.children}
    </div>
  )
}
