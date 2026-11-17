import { dialogActionsClassName } from '@fex-design/components-styles/dialog'
import { cn } from '@fex-design/utils'
import { splitProps, type ParentProps } from 'solid-js'

export type DialogActionsProps = ParentProps<{ class?: string }>

export function DialogActions(props: DialogActionsProps) {
  const [local, rest] = splitProps(props, ['children', 'class'])
  return (
    <div {...rest} data-slot="dialog-actions" class={cn(dialogActionsClassName, local.class)}>
      {local.children}
    </div>
  )
}
