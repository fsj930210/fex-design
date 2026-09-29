import {
  type ComponentProps,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
  type Ref,
} from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { useComposedRef } from "@/hooks/use-composed-ref"
import { useCoreStore } from "@/hooks/use-core-store"
import { useMemoizedFn } from "@/hooks/use-memoized-fn"
import { usePopoverContext } from "./popover-context"

const popoverContentClassName = cva(
  "z-[var(--floating-z-index,50)] w-max max-h-[var(--floating-available-height,calc(100vh-16px))] max-w-[var(--floating-available-width,calc(100vw-16px))] overflow-visible rounded-[var(--popover-radius,var(--radius-md))] border border-[var(--popover-border,var(--border))] bg-[var(--popover-background,var(--elevated-background))] p-[var(--popover-padding,12px)] text-sm text-[var(--popover-foreground,var(--elevated-foreground))] shadow-[var(--popover-shadow,var(--shadow-lg))] outline-none origin-[var(--floating-transform-origin)] will-change-[opacity,transform] before:absolute before:content-[ ] data-[side=right]:before:right-full data-[side=right]:before:top-0 data-[side=right]:before:h-full data-[side=right]:before:w-[var(--floating-side-offset,0px)] data-[side=left]:before:left-full data-[side=left]:before:top-0 data-[side=left]:before:h-full data-[side=left]:before:w-[var(--floating-side-offset,0px)] data-[side=bottom]:before:bottom-full data-[side=bottom]:before:left-0 data-[side=bottom]:before:h-[var(--floating-side-offset,0px)] data-[side=bottom]:before:w-full data-[side=top]:before:top-full data-[side=top]:before:left-0 data-[side=top]:before:h-[var(--floating-side-offset,0px)] data-[side=top]:before:w-full transition-[opacity,transform] duration-[var(--popover-motion-duration,140ms)] ease-[cubic-bezier(0.2,0,0,1)] data-[state=open]:scale-100 data-[state=open]:opacity-100 data-[phase=closing]:pointer-events-none data-[phase=closing]:scale-95 data-[phase=closing]:opacity-0 data-[state=closed]:pointer-events-none data-[state=closed]:scale-95 data-[state=closed]:opacity-0",
)

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
