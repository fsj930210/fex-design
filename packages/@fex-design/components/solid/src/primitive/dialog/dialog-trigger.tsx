import type { createDialogController } from "@fex-design/core/dialog/create-dialog-controller"
import { splitProps, type JSX } from "solid-js"
import { useDialog } from "./dialog-context"

export type DialogTriggerRenderProps = {
  props: {
    "aria-controls": string | undefined
    "aria-expanded": boolean
    "aria-haspopup": "dialog"
    "data-state": "open" | "closed"
    class: string | undefined
    onClick: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent>
    type: "button"
  }
  ref: (element: HTMLButtonElement) => void
  state: ReturnType<ReturnType<typeof createDialogController>["getSnapshot"]>
}

export interface DialogTriggerProps {
  children: (props: DialogTriggerRenderProps) => JSX.Element
  class?: string
}

export function DialogTrigger(props: DialogTriggerProps) {
  const [local] = splitProps(props, ["children", "class"])
  const { contentId, dialog, snapshot, triggerElement } = useDialog("DialogTrigger")

  return local.children({
    ref: (element) => {
      triggerElement.current = element
    },
    state: snapshot(),
    props: {
      type: "button",
      class: local.class,
      "aria-haspopup": "dialog",
      "aria-expanded": snapshot().open,
      "aria-controls": snapshot().open ? contentId : undefined,
      "data-state": snapshot().open ? "open" : "closed",
      onClick: (event) => dialog.toggle({ reason: "trigger-click", event }),
    },
  })
}
