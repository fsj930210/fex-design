import {
  dialogContentClassName,
  type DialogStyleProps,
} from "@fex-design/components-styles/dialog"
import { cn } from "@fex-design/utils"
import { onCleanup, Show, splitProps, type ParentProps } from "solid-js"
import { useDialog } from "./dialog-context"

export interface DialogContentProps extends ParentProps {
  class?: string
  size?: DialogStyleProps["size"]
}

export function DialogContent(props: DialogContentProps) {
  const [local, rest] = splitProps(props, ["children", "class", "size"])
  const { contentId, descriptionId, dialog, snapshot, titleId } = useDialog("DialogContent")
  onCleanup(() => dialog.setLayerElement(null))
  return (
    <Show when={snapshot().mounted}>
      <div
        ref={(element) => dialog.setLayerElement(element)}
        id={contentId}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        tabIndex={-1}
        data-slot="dialog-content"
        data-state={snapshot().open ? "open" : "closed"}
        data-phase={snapshot().phase}
        class={cn(dialogContentClassName({ size: local.size }), local.class)}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            dialog.dismiss.escapeKey({
              target: event.target,
              currentTarget: event.currentTarget,
              event,
            })
          }
        }}
      >
        {local.children}
      </div>
    </Show>
  )
}
