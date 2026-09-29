import {
  type ComponentProps,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
  type Ref,
} from "react"
import { popoverContentClassName } from "@fex-design/components-styles/popover"
import { cn } from "@fex-design/utils"
import { useComposedRef } from "@fex-design/react/hooks/use-composed-ref"
import { useCoreStore } from "@fex-design/react/hooks/use-core-store"
import { useMemoizedFn } from "@fex-design/react/hooks/use-memoized-fn"
import { usePopoverContext } from "./popover-context"

function toEventInfo(event: PointerEvent<HTMLElement>) {
  return {
    target: event.target,
    currentTarget: event.currentTarget,
    clientX: event.clientX,
    clientY: event.clientY,
    button: event.button,
    pointerType: event.pointerType,
    event,
    preventDefault: event.preventDefault.bind(event),
    stopPropagation: event.stopPropagation.bind(event),
  }
}

export interface PopoverContentProps extends ComponentProps<"div"> {
  ref?: Ref<HTMLDivElement> | undefined
  children?: ReactNode
}

export function PopoverContent({
  children,
  ref,
  className,
  style,
  role = "dialog",
  tabIndex = -1,
  onPointerEnter,
  onPointerLeave,
  onKeyDown,
  ...props
}: PopoverContentProps) {
  const { overlay } = usePopoverContext("PopoverContent")
  const snapshot = useCoreStore(overlay)
  const setContentElement = useMemoizedFn((element: HTMLDivElement | null) =>
    overlay.setFloatingElement(element),
  )
  const composedRef = useComposedRef<HTMLDivElement>(setContentElement, ref)

  if (!snapshot.mounted) {
    return null
  }

  return (
    <div
      {...props}
      ref={composedRef}
      role={role}
      tabIndex={tabIndex}
      hidden={snapshot.phase === "closed"}
      inert={!snapshot.open}
      data-slot="popover-content"
      data-state={snapshot.open ? "open" : "closed"}
      data-phase={snapshot.phase}
      data-side={snapshot.side}
      data-align={snapshot.align}
      data-placement={snapshot.placement}
      className={cn(popoverContentClassName(), className)}
      style={{
        position: "var(--floating-strategy, absolute)",
        left: "var(--floating-x, 0px)",
        top: "var(--floating-y, 0px)",
        transformOrigin: "var(--floating-transform-origin)",
        ...style,
      } as CSSProperties}
      onPointerEnter={(event: PointerEvent<HTMLDivElement>) => {
        onPointerEnter?.(event)
        if (!event.defaultPrevented) overlay.content.pointerEnter(toEventInfo(event))
      }}
      onPointerLeave={(event: PointerEvent<HTMLDivElement>) => {
        onPointerLeave?.(event)
        if (!event.defaultPrevented) overlay.content.pointerLeave(toEventInfo(event))
      }}
      onKeyDown={(event: KeyboardEvent<HTMLDivElement>) => onKeyDown?.(event)}
    >
      {children}
    </div>
  )
}
