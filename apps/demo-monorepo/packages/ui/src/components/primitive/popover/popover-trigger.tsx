import {
  type ComponentProps,
  type FocusEvent,
  type MouseEvent,
  type PointerEvent,
  type ReactNode,
  type Ref,
} from "react"
import { useComposedRef } from "@demo/ui/hooks/use-composed-ref"
import { useCoreStore } from "@demo/ui/hooks/use-core-store"
import { useMemoizedFn } from "@demo/ui/hooks/use-memoized-fn"
import { usePopoverContext } from "./popover-context"

function toEventInfo(
  event: MouseEvent<HTMLElement> | PointerEvent<HTMLElement> | FocusEvent<HTMLElement>,
) {
  return {
    target: event.target,
    currentTarget: event.currentTarget,
    clientX: "clientX" in event ? event.clientX : undefined,
    clientY: "clientY" in event ? event.clientY : undefined,
    button: "button" in event ? event.button : undefined,
    pointerType: "pointerType" in event ? event.pointerType : undefined,
    event,
    preventDefault: event.preventDefault.bind(event),
    stopPropagation: event.stopPropagation.bind(event),
  }
}

export type PopoverTriggerRenderProps = Omit<ComponentProps<"button">, "ref"> & {
  "data-state": "open" | "closed"
  ref: Ref<HTMLButtonElement>
}

export interface PopoverTriggerProps extends Omit<ComponentProps<"button">, "children"> {
  ref?: Ref<HTMLButtonElement>
  children: (props: PopoverTriggerRenderProps) => ReactNode
}


export function PopoverTrigger({
  children,
  ref,
  type = "button",
  onClick,
  onPointerEnter,
  onPointerLeave,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  onContextMenu,
  ...props
}: PopoverTriggerProps) {
  const { overlay, triggerRef } = usePopoverContext("PopoverTrigger")
  const snapshot = useCoreStore(overlay)
  const open = snapshot.open

  const setReference = useMemoizedFn((element: HTMLButtonElement | null) => {
    triggerRef.current = element
    overlay.setReferenceElement(element)
  })
  const syncReferenceFromEvent = useMemoizedFn(
    (
      event:
        | MouseEvent<HTMLButtonElement>
        | PointerEvent<HTMLButtonElement>
        | FocusEvent<HTMLButtonElement>,
    ) => {
      triggerRef.current = event.currentTarget
      overlay.setReferenceElement(event.currentTarget)
    },
  )
  const composedRef = useComposedRef<HTMLButtonElement>(setReference, ref)

  const triggerProps: PopoverTriggerRenderProps = {
    ...props,
    ref: composedRef,
    type,
    "aria-haspopup": props["aria-haspopup"] ?? "dialog",
    "aria-expanded": open,
    "data-state": open ? "open" : "closed",
    onClick: (event) => {
      onClick?.(event)
      if (!event.defaultPrevented && overlay.getSnapshot().trigger.includes("click")) {
        syncReferenceFromEvent(event)
        overlay.trigger.click(toEventInfo(event))
      }
    },
    onPointerEnter: (event) => {
      onPointerEnter?.(event)
      if (!event.defaultPrevented) {
        syncReferenceFromEvent(event)
        overlay.trigger.pointerEnter(toEventInfo(event))
      }
    },
    onPointerLeave: (event) => {
      onPointerLeave?.(event)
      if (!event.defaultPrevented) {
        syncReferenceFromEvent(event)
        overlay.trigger.pointerLeave(toEventInfo(event))
      }
    },
    onMouseEnter: (event) => {
      onMouseEnter?.(event)
    },
    onMouseLeave: (event) => {
      onMouseLeave?.(event)
    },
    onFocus: (event) => {
      onFocus?.(event)
      if (!event.defaultPrevented) {
        syncReferenceFromEvent(event)
        overlay.trigger.focus(toEventInfo(event))
      }
    },
    onBlur: (event) => {
      onBlur?.(event)
      if (!event.defaultPrevented) {
        syncReferenceFromEvent(event)
        overlay.trigger.blur(toEventInfo(event))
      }
    },
    onContextMenu: (event) => {
      onContextMenu?.(event)
      if (!event.defaultPrevented) {
        syncReferenceFromEvent(event)
        overlay.trigger.contextMenu(toEventInfo(event))
      }
    },
  }

  return children(triggerProps)
}
