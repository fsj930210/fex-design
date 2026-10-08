import {
  dialogContentClassName,
  type DialogStyleProps,
} from "@fex-design/components-styles/dialog"
import { cn } from "@fex-design/utils"
import type { ComponentProps, KeyboardEvent, Ref } from "react"
import { useMemoizedFn } from "@fex-design/react/hooks/use-memoized-fn"
import { useDialog } from "./use-dialog"

function toEventInfo(event: {
  target: EventTarget | null
  currentTarget: EventTarget | null
  event?: Event
}) {
  return {
    target: event.target,
    currentTarget: event.currentTarget,
    event: "event" in event ? event.event : undefined,
  }
}

export interface DialogContentProps extends ComponentProps<"div">, DialogStyleProps {
  ref?: Ref<HTMLDivElement>
}

export function DialogContent({ ref, className, size, onKeyDown, ...props }: DialogContentProps) {
  const { contentId, descriptionId, dialog, snapshot, titleId } = useDialog("DialogContent")
  const setContent = useMemoizedFn((element: HTMLDivElement | null) => {
    dialog.setLayerElement(element)
    if (typeof ref === "function") ref(element)
    else if (ref && "current" in ref) ref.current = element
  })

  if (!snapshot.mounted) {
    return null
  }

  return (
    <div
      {...props}
      ref={setContent}
      id={contentId}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      tabIndex={-1}
      data-slot="dialog-content"
      data-state={snapshot.open ? "open" : "closed"}
      data-phase={snapshot.phase}
      className={cn(dialogContentClassName({ size }), className)}
      onKeyDown={(event: KeyboardEvent<HTMLDivElement>) => {
        onKeyDown?.(event)
        if (!event.defaultPrevented && event.key === "Escape") {
          dialog.dismiss.escapeKey({ ...toEventInfo(event), event: event.nativeEvent })
        }
      }}
    />
  )
}
