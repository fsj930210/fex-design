import { dialogFooterClassName } from "@fex-design/components-styles/dialog"
import { cn } from "@fex-design/utils"
import { splitProps, type ParentProps } from "solid-js"

export type DialogFooterProps = ParentProps<{ class?: string }>

export function DialogFooter(props: DialogFooterProps) {
  const [local, rest] = splitProps(props, ["children", "class"])
  return (
    <div {...rest} data-slot="dialog-footer" class={cn(dialogFooterClassName, local.class)}>
      {local.children}
    </div>
  )
}
