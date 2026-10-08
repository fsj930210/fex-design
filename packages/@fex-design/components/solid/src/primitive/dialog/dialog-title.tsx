import { dialogTitleClassName } from "@fex-design/components-styles/dialog"
import { cn } from "@fex-design/utils"
import { splitProps, type ParentProps } from "solid-js"
import { useDialog } from "./dialog-context"

export type DialogTitleProps = ParentProps<{ class?: string }>

export function DialogTitle(props: DialogTitleProps) {
  const [local, rest] = splitProps(props, ["children", "class"])
  const { titleId } = useDialog("DialogTitle")
  return (
    <h2
      {...rest}
      id={titleId}
      data-slot="dialog-title"
      class={cn(dialogTitleClassName, local.class)}
    >
      {local.children}
    </h2>
  )
}
