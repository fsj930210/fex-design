import { dialogOverlayClassName } from "@fex-design/components-styles/dialog"
import { cn } from "@fex-design/utils"
import { onCleanup, splitProps } from "solid-js"
import { useDialog } from "./dialog-context"

export interface DialogOverlayProps {
  class?: string
}

export function DialogOverlay(props: DialogOverlayProps) {
  const [local] = splitProps(props, ["class"])
  const { dialog, snapshot } = useDialog("DialogOverlay")
  onCleanup(() => dialog.setOverlayElement(null))
  return (
    <div
      ref={(element) => dialog.setOverlayElement(element)}
      data-slot="dialog-overlay"
      data-state={snapshot().open ? "open" : "closed"}
      data-phase={snapshot().phase}
      class={cn(dialogOverlayClassName, local.class)}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          dialog.dismiss.overlayPointer({
            target: event.target,
            currentTarget: event.currentTarget,
            event,
          })
        }
      }}
    />
  )
}
