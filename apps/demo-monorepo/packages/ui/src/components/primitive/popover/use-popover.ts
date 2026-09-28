import { shallowEqualObject } from '@demo/utils'
import { useCoreStoreSelector } from '@demo/hooks/use-core-store-selector'
import { selectOpen, selectContent, selectArrow } from './selectors'
import type { CSSProperties, FocusEvent, KeyboardEvent, MouseEvent, PointerEvent } from 'react'

import { cn } from '@demo/utils'
import { useComposedRef } from '@demo/hooks/use-composed-ref'
import { useCoreStore } from '@demo/hooks/use-core-store'
import { useMemoizedFn } from '@demo/hooks/use-memoized-fn'
import type {
  PopoverArrowProps,
  PopoverContentProps,
  PopoverTriggerRenderProps,
  UsePopoverTriggerProps,
} from './popover'
import { usePopoverContext, type PopoverContextValue } from './popover-context'
import { cva } from 'class-variance-authority'

const popoverContentClassName = cva(
  "z-[var(--floating-z-index,50)] w-max max-h-[var(--floating-available-height,calc(100vh-16px))] max-w-[var(--floating-available-width,calc(100vw-16px))] overflow-visible rounded-[var(--popover-radius,var(--radius-md))] border border-[var(--popover-border,var(--border))] bg-[var(--popover-background,var(--elevated-background))] p-[var(--popover-padding,12px)] text-sm text-[var(--popover-foreground,var(--elevated-foreground))] shadow-[var(--popover-shadow,var(--shadow-lg))] outline-none origin-[var(--floating-transform-origin)] will-change-[opacity,transform] before:absolute before:content-[ ] data-[side=right]:before:right-full data-[side=right]:before:top-0 data-[side=right]:before:h-full data-[side=right]:before:w-[var(--floating-side-offset,0px)] data-[side=left]:before:left-full data-[side=left]:before:top-0 data-[side=left]:before:h-full data-[side=left]:before:w-[var(--floating-side-offset,0px)] data-[side=bottom]:before:bottom-full data-[side=bottom]:before:left-0 data-[side=bottom]:before:h-[var(--floating-side-offset,0px)] data-[side=bottom]:before:w-full data-[side=top]:before:top-full data-[side=top]:before:left-0 data-[side=top]:before:h-[var(--floating-side-offset,0px)] data-[side=top]:before:w-full transition-[opacity,transform] duration-[var(--popover-motion-duration,140ms)] ease-[cubic-bezier(0.2,0,0,1)] data-[state=open]:scale-100 data-[state=open]:opacity-100 data-[phase=closing]:pointer-events-none data-[phase=closing]:scale-95 data-[phase=closing]:opacity-0 data-[state=closed]:pointer-events-none data-[state=closed]:scale-95 data-[state=closed]:opacity-0",
)

export { usePopover } from './use-popover-controller'

export function usePopoverContextSnapshot(component = 'usePopover') {
  const context = usePopoverContext(component)
  const snapshot = useCoreStore(context.overlay)
  return { ...context, snapshot }
}

function toEventInfo(
  event: MouseEvent<HTMLElement> | PointerEvent<HTMLElement> | FocusEvent<HTMLElement>,
) {
  return {
    target: event.target,
    currentTarget: event.currentTarget,
    clientX: 'clientX' in event ? event.clientX : undefined,
    clientY: 'clientY' in event ? event.clientY : undefined,
    button: 'button' in event ? event.button : undefined,
    pointerType: 'pointerType' in event ? event.pointerType : undefined,
    event,
    preventDefault: event.preventDefault.bind(event),
    stopPropagation: event.stopPropagation.bind(event),
  }
}

export function usePopoverTrigger(
  {
    ref,
    onClick,
    onPointerEnter,
    onPointerLeave,
    onMouseEnter,
    onMouseLeave,
    onFocus,
    onBlur,
    onContextMenu,
    ...props
  }: UsePopoverTriggerProps,
  binding?: PopoverContextValue,
) {
  const { overlay, triggerRef } = usePopoverContext('usePopoverTrigger', binding)
  const open = useCoreStoreSelector(overlay, selectOpen)
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
    type: props.type ?? 'button',
    'aria-haspopup': props['aria-haspopup'] ?? 'dialog',
    'aria-expanded': open,
    'data-state': open ? 'open' : 'closed',
    onClick: (event) => {
      onClick?.(event)
      if (!event.defaultPrevented && overlay.getSnapshot().trigger.includes('click')) {
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
  return { props: triggerProps, open }
}

export function usePopoverContent(
  {
    ref,
    className,
    style,
    onPointerEnter,
    onPointerLeave,
    onKeyDown,
    ...props
  }: PopoverContentProps,
  binding?: PopoverContextValue,
) {
  const { overlay } = usePopoverContext('usePopoverContent', binding)
  const snapshot = useCoreStoreSelector(overlay, selectContent, shallowEqualObject)
  const setContentElement = useMemoizedFn((element: HTMLDivElement | null) =>
    overlay.setFloatingElement(element),
  )
  const composedRef = useComposedRef<HTMLDivElement>(setContentElement, ref)
  if (!snapshot.mounted) return { mounted: false as const, props: null, snapshot }
  return {
    mounted: true as const,
    snapshot,
    props: {
      ...props,
      ref: composedRef,
      role: props.role ?? 'dialog',
      tabIndex: props.tabIndex ?? -1,
      hidden: snapshot.phase === 'closed',
      inert: !snapshot.open,
      'data-slot': 'popover-content',
      'data-state': snapshot.open ? ('open' as const) : ('closed' as const),
      'data-phase': snapshot.phase,
      'data-side': snapshot.side,
      'data-align': snapshot.align,
      'data-placement': snapshot.placement,
      className: cn(popoverContentClassName(), className),
      style: {
        position: 'var(--floating-strategy, absolute)',
        left: 'var(--floating-x, 0px)',
        top: 'var(--floating-y, 0px)',
        transformOrigin: 'var(--floating-transform-origin)',
        ...style,
      } as CSSProperties,
      onPointerEnter: (event: PointerEvent<HTMLDivElement>) => {
        onPointerEnter?.(event)
        if (!event.defaultPrevented) overlay.content.pointerEnter(toEventInfo(event))
      },
      onPointerLeave: (event: PointerEvent<HTMLDivElement>) => {
        onPointerLeave?.(event)
        if (!event.defaultPrevented) overlay.content.pointerLeave(toEventInfo(event))
      },
      onKeyDown: (event: KeyboardEvent<HTMLDivElement>) => onKeyDown?.(event),
    },
  }
}

export function usePopoverArrow(
  { ref, className, style, ...props }: PopoverArrowProps,
  binding?: PopoverContextValue,
) {
  const { arrowRef, overlay } = usePopoverContext('usePopoverArrow', binding)
  const { arrow, side } = useCoreStoreSelector(overlay, selectArrow, shallowEqualObject)
  const setArrowElement = useMemoizedFn((element: HTMLDivElement | null) => {
    arrowRef.current = element
    overlay.setArrowElement(element)
  })
  const composedRef = useComposedRef<HTMLDivElement>(setArrowElement, ref)
  if (!arrow) return { mounted: false as const, props: null, side }
  const floatingArrowStyle =
    side === 'left' || side === 'right'
      ? {
          top: 'var(--floating-arrow-y, 0px)',
        }
      : {
          left: 'var(--floating-arrow-x, 0px)',
        }
  return {
    mounted: true as const,
    side,
    props: {
      ...props,
      ref: composedRef,
      'data-slot': 'popover-arrow',
      'data-side': side,
      className: cn("pointer-events-none absolute size-[var(--popover-arrow-size,12px)] bg-[var(--popover-background,var(--elevated-background))] data-[side=top]:bottom-[calc(var(--popover-arrow-size,12px)/-2)] data-[side=top]:border-b data-[side=top]:border-r data-[side=top]:border-[var(--popover-border,var(--border))] data-[side=bottom]:top-[calc(var(--popover-arrow-size,12px)/-2)] data-[side=bottom]:border-l data-[side=bottom]:border-t data-[side=bottom]:border-[var(--popover-border,var(--border))] data-[side=left]:right-[calc(var(--popover-arrow-size,12px)/-2)] data-[side=left]:border-r data-[side=left]:border-t data-[side=left]:border-[var(--popover-border,var(--border))] data-[side=right]:left-[calc(var(--popover-arrow-size,12px)/-2)] data-[side=right]:border-b data-[side=right]:border-l data-[side=right]:border-[var(--popover-border,var(--border))] data-[side=top]:rotate-45 data-[side=bottom]:rotate-45 data-[side=left]:rotate-45 data-[side=right]:rotate-45", className),
      style: { ...floatingArrowStyle, ...style } as CSSProperties,
    },
  }
}
