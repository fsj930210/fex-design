import type {
  FocusEvent,
  HTMLAttributes,
  PointerEvent,
  ReactNode,
  Ref,
  RefCallback,
} from "react"
import { useComposedRef } from "@/hooks/use-composed-ref"
import { useMemoizedFn } from "@/hooks/use-memoized-fn"
import { useTooltip } from "./use-tooltip"

function toEventInfo(event: PointerEvent<HTMLElement> | FocusEvent<HTMLElement>) {
  return { target: event.target, currentTarget: event.currentTarget, event }
}

export type TooltipTriggerRenderProps = Omit<HTMLAttributes<HTMLElement>, "ref"> & {
  "aria-describedby"?: string | undefined
  "data-state": "open" | "closed"
  ref: RefCallback<HTMLElement>
}

export interface TooltipTriggerProps extends Omit<HTMLAttributes<HTMLElement>, "children"> {
  ref?: Ref<HTMLElement>
  children: (props: TooltipTriggerRenderProps) => ReactNode
}

export function TooltipTrigger({
  children,
  ref,
  onPointerEnter,
  onPointerLeave,
  onFocus,
  onBlur,
  ...props
}: TooltipTriggerProps) {
  const { contentId, overlay, snapshot, triggerRef } = useTooltip("TooltipTrigger")
  const setReference = useMemoizedFn((element: HTMLElement | null) => {
    triggerRef.current = element
    overlay.setReferenceElement(element)
  })
  const composedRef = useComposedRef<HTMLElement>(setReference, ref)
  const triggerProps: TooltipTriggerRenderProps = {
    ...props,
    ref: composedRef,
    "aria-describedby": snapshot.mounted
      ? [props["aria-describedby"], contentId].filter(Boolean).join(" ")
      : props["aria-describedby"],
    "data-state": snapshot.open ? "open" : "closed",
    onPointerEnter: (event: PointerEvent<HTMLElement>) => {
      onPointerEnter?.(event)
      if (!event.defaultPrevented) overlay.trigger.pointerEnter(toEventInfo(event))
    },
    onPointerLeave: (event: PointerEvent<HTMLElement>) => {
      onPointerLeave?.(event)
      if (!event.defaultPrevented) overlay.trigger.pointerLeave(toEventInfo(event))
    },
    onFocus: (event: FocusEvent<HTMLElement>) => {
      onFocus?.(event)
      if (!event.defaultPrevented) overlay.trigger.focus(toEventInfo(event))
    },
    onBlur: (event: FocusEvent<HTMLElement>) => {
      onBlur?.(event)
      if (!event.defaultPrevented) overlay.trigger.blur(toEventInfo(event))
    },
  }

  return children(triggerProps)
}
