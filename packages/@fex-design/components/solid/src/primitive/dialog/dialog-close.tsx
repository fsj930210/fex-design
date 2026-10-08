import { dialogCloseClassName } from "@fex-design/components-styles/dialog"
import { cn } from "@fex-design/utils"
import { splitProps, type JSX } from "solid-js"
import { useDialog } from "./dialog-context"

export type DialogCloseRenderProps = {
  class: string
  onClick: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent>
  type: "button"
  "data-slot": "dialog-close"
}

export interface DialogCloseProps {
  children?: JSX.Element | ((props: DialogCloseRenderProps) => JSX.Element)
  class?: string
}

export function DialogClose(props: DialogCloseProps) {
  const [local, rest] = splitProps(props, ["children", "class"])
  const { dialog } = useDialog("DialogClose")
  const closeProps = {
    ...rest,
    type: "button" as const,
    "data-slot": "dialog-close" as const,
    class: cn(dialogCloseClassName, local.class),
    onClick: (event: MouseEvent) =>
      dialog.close({ reason: "manual", source: "close-button", event }),
  }

  return typeof local.children === "function" ? (
    local.children(closeProps)
  ) : (
    <button {...closeProps}>{local.children ?? "Close"}</button>
  )
}
