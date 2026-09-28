import type { CSSProperties, FocusEvent, HTMLAttributes, PointerEvent, Ref } from 'react'

import { getTooltipArrowPosition } from './utils'
import { cn } from '@/lib/utils'
import { useComposedRef } from '@/hooks/use-composed-ref'
import { useCoreStore } from '@/hooks/use-core-store'
import { useMemoizedFn } from '@/hooks/use-memoized-fn'
import { useTooltipContext } from './tooltip-context'

function eventInfo(event: PointerEvent<HTMLElement> | FocusEvent<HTMLElement>) {
  return { target: event.target, currentTarget: event.currentTarget, event }
}

export function useTooltip(component = 'useTooltip') {
  const context = useTooltipContext(component)
  const snapshot = useCoreStore(context.overlay)
  return { ...context, snapshot }
}

export interface UseTooltipTriggerProps extends HTMLAttributes<HTMLElement> {
  ref?: Ref<HTMLElement>
}

export function useTooltipTrigger({
  ref,
  onPointerEnter,
  onPointerLeave,
  onFocus,
  onBlur,
  ...props
}: UseTooltipTriggerProps = {}) {
  const { contentId, overlay, snapshot, triggerRef } = useTooltip('useTooltipTrigger')
  const setReference = useMemoizedFn((element: HTMLElement | null) => {
    triggerRef.current = element
    overlay.setReferenceElement(element)
  })
  const composedRef = useComposedRef(setReference, ref)
  return {
    snapshot,
    props: {
      ...props,
      ref: composedRef,
      'aria-describedby': snapshot.mounted
        ? [props['aria-describedby'], contentId].filter(Boolean).join(' ')
        : props['aria-describedby'],
      'data-state': snapshot.open ? ('open' as const) : ('closed' as const),
      onPointerEnter: (event: PointerEvent<HTMLElement>) => {
        onPointerEnter?.(event)
        if (!event.defaultPrevented) overlay.trigger.pointerEnter(eventInfo(event))
      },
      onPointerLeave: (event: PointerEvent<HTMLElement>) => {
        onPointerLeave?.(event)
        if (!event.defaultPrevented) overlay.trigger.pointerLeave(eventInfo(event))
      },
      onFocus: (event: FocusEvent<HTMLElement>) => {
        onFocus?.(event)
        if (!event.defaultPrevented) overlay.trigger.focus(eventInfo(event))
      },
      onBlur: (event: FocusEvent<HTMLElement>) => {
        onBlur?.(event)
        if (!event.defaultPrevented) overlay.trigger.blur(eventInfo(event))
      },
    },
  }
}

export function useTooltipContent({
  ref,
  className,
  style,
  onPointerEnter,
  onPointerLeave,
  ...props
}: HTMLAttributes<HTMLDivElement> & { ref?: Ref<HTMLDivElement> }) {
  const { contentId, overlay, snapshot } = useTooltip('useTooltipContent')
  const setContent = useMemoizedFn((element: HTMLDivElement | null) =>
    overlay.setFloatingElement(element),
  )
  const composedRef = useComposedRef(setContent, ref)
  if (!snapshot.mounted) return { mounted: false as const, props: null, snapshot }
  return {
    mounted: true as const,
    snapshot,
    props: {
      ...props,
      id: contentId,
      ref: composedRef,
      role: 'tooltip',
      'data-slot': 'tooltip-content',
      'data-state': snapshot.open ? ('open' as const) : ('closed' as const),
      'data-phase': snapshot.phase,
      'data-side': snapshot.side,
      'data-align': snapshot.align,
      'data-placement': snapshot.placement,
      className: cn("z-[var(--floating-z-index,50)] max-w-[min(var(--floating-available-width,calc(100vw-16px)),var(--tooltip-content-max-width,280px))] rounded-md bg-[var(--tooltip-background,var(--foreground))] px-2 py-1.5 text-xs leading-5 text-[var(--tooltip-foreground,var(--background))] shadow-md before:absolute before:content-[''] data-[side=right]:before:right-full data-[side=right]:before:top-0 data-[side=right]:before:h-full data-[side=right]:before:w-[var(--floating-side-offset,0px)] data-[side=left]:before:left-full data-[side=left]:before:top-0 data-[side=left]:before:h-full data-[side=left]:before:w-[var(--floating-side-offset,0px)] data-[side=bottom]:before:bottom-full data-[side=bottom]:before:left-0 data-[side=bottom]:before:h-[var(--floating-side-offset,0px)] data-[side=bottom]:before:w-full data-[side=top]:before:top-full data-[side=top]:before:left-0 data-[side=top]:before:h-[var(--floating-side-offset,0px)] data-[side=top]:before:w-full origin-[var(--floating-transform-origin)] will-change-[opacity,transform] transition-[opacity,transform] duration-[var(--tooltip-motion-duration,100ms)] ease-[var(--tooltip-motion-ease,cubic-bezier(0.2,0,0,1))] data-[state=open]:translate-x-0 data-[state=open]:translate-y-0 data-[state=open]:scale-100 data-[state=open]:opacity-100 data-[state=closed]:pointer-events-none data-[phase=closed]:hidden data-[side=top]:data-[state=closed]:translate-y-1 data-[side=bottom]:data-[state=closed]:-translate-y-1 data-[side=left]:data-[state=closed]:translate-x-1 data-[side=right]:data-[state=closed]:-translate-x-1 data-[phase=closing]:scale-95 data-[phase=closing]:opacity-0 data-[state=closed]:scale-95 data-[state=closed]:opacity-0", className),
      onPointerEnter: (event: PointerEvent<HTMLDivElement>) => {
        onPointerEnter?.(event)
        if (!event.defaultPrevented) overlay.content.pointerEnter(eventInfo(event))
      },
      onPointerLeave: (event: PointerEvent<HTMLDivElement>) => {
        onPointerLeave?.(event)
        if (!event.defaultPrevented) overlay.content.pointerLeave(eventInfo(event))
      },
      style: {
        position: 'var(--floating-strategy, absolute)',
        left: 'var(--floating-x, 0px)',
        top: 'var(--floating-y, 0px)',
        transformOrigin: 'var(--floating-transform-origin)',
        ...style,
      } as CSSProperties,
    },
  }
}

export function useTooltipArrow({
  ref,
  className,
  style,
  ...props
}: HTMLAttributes<HTMLDivElement> & { ref?: Ref<HTMLDivElement> }) {
  const { overlay, snapshot } = useTooltip('useTooltipArrow')
  const setArrow = useMemoizedFn((element: HTMLDivElement | null) =>
    overlay.setArrowElement(element),
  )
  const composedRef = useComposedRef(setArrow, ref)
  const position = getTooltipArrowPosition(snapshot.side, snapshot.align)
  return {
    snapshot,
    props: {
      ...props,
      ref: composedRef,
      'data-slot': 'tooltip-arrow',
      'data-side': snapshot.side,
      'data-align': snapshot.align,
      className: cn("pointer-events-none absolute size-2 bg-[var(--tooltip-background,var(--foreground))] data-[side=top]:data-[align=start]:left-[var(--tooltip-arrow-edge-offset-x,clamp(16px,25%,32px))] data-[side=bottom]:data-[align=start]:left-[var(--tooltip-arrow-edge-offset-x,clamp(16px,25%,32px))] data-[side=top]:data-[align=end]:left-[calc(100%-var(--tooltip-arrow-edge-offset-x,clamp(16px,25%,32px)))] data-[side=bottom]:data-[align=end]:left-[calc(100%-var(--tooltip-arrow-edge-offset-x,clamp(16px,25%,32px)))] rtl:data-[side=top]:data-[align=start]:left-[calc(100%-var(--tooltip-arrow-edge-offset-x,clamp(16px,25%,32px)))] rtl:data-[side=bottom]:data-[align=start]:left-[calc(100%-var(--tooltip-arrow-edge-offset-x,clamp(16px,25%,32px)))] rtl:data-[side=top]:data-[align=end]:left-[var(--tooltip-arrow-edge-offset-x,clamp(16px,25%,32px))] rtl:data-[side=bottom]:data-[align=end]:left-[var(--tooltip-arrow-edge-offset-x,clamp(16px,25%,32px))] data-[side=top]:-bottom-1 data-[side=bottom]:-top-1 data-[side=left]:-right-1 data-[side=right]:-left-1 data-[side=top]:-translate-x-1/2 data-[side=top]:rotate-45 data-[side=bottom]:-translate-x-1/2 data-[side=bottom]:rotate-45 data-[side=left]:-translate-y-1/2 data-[side=left]:rotate-45 data-[side=right]:-translate-y-1/2 data-[side=right]:rotate-45", className),
      style: { ...position, ...style } as CSSProperties,
    },
  }
}
