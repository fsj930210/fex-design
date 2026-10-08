import { dialogBodyClassName } from "@fex-design/components-styles/dialog"
import { cn } from "@fex-design/utils"
import { splitProps, type ParentProps } from "solid-js"

export type DialogBodyProps = ParentProps<{ class?: string }>

export function DialogBody(props: DialogBodyProps) {
  const [local, rest] = splitProps(props, ["children", "class"])
  return (
    <div {...rest} data-slot="dialog-body" class={cn(dialogBodyClassName, local.class)}>
      {local.children}
    </div>
  )
}
