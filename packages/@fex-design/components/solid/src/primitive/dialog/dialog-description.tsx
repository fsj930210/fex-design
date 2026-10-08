import { dialogDescriptionClassName } from "@fex-design/components-styles/dialog"
import { cn } from "@fex-design/utils"
import { splitProps, type ParentProps } from "solid-js"
import { useDialog } from "./dialog-context"

export type DialogDescriptionProps = ParentProps<{ class?: string }>

export function DialogDescription(props: DialogDescriptionProps) {
  const [local, rest] = splitProps(props, ["children", "class"])
  const { descriptionId } = useDialog("DialogDescription")
  return (
    <p
      {...rest}
      id={descriptionId}
      data-slot="dialog-description"
      class={cn(dialogDescriptionClassName, local.class)}
    >
      {local.children}
    </p>
  )
}
