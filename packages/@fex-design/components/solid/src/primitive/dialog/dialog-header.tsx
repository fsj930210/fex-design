import { dialogHeaderClassName } from "@fex-design/components-styles/dialog"
import { cn } from "@fex-design/utils"
import { splitProps, type ParentProps } from "solid-js"

export type DialogHeaderProps = ParentProps<{ class?: string }>

export function DialogHeader(props: DialogHeaderProps) {
  const [local, rest] = splitProps(props, ["children", "class"])
  return (
    <div {...rest} data-slot="dialog-header" class={cn(dialogHeaderClassName, local.class)}>
      {local.children}
    </div>
  )
}
