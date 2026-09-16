import type { TooltipOptions } from './create-tooltip'

export const tooltipOptionKeys = [
  'open',
  'defaultOpen',
  'onOpenChange',
  'disabled',
  'placement',
  'side',
  'align',
  'sideOffset',
  'alignOffset',
  'offset',
  'strategy',
  'avoidCollisions',
  'autoAdjustOverflow',
  'collisionBoundary',
  'collisionPadding',
  'arrowPadding',
  'matchReferenceWidth',
  'hideWhenDetached',
  'zIndex',
  'getPopupContainer',
  'hoverOpenDelay',
  'hoverCloseDelay',
  'closeDelay',
  'forceMount',
  'lazyMount',
  'destroyOnHidden',
] as const satisfies readonly (keyof TooltipOptions)[]

export function splitTooltipOptions<T extends TooltipOptions>(props: T) {
  const options: Record<string, unknown> = {}
  const remaining = { ...props }
  for (const key of tooltipOptionKeys) {
    if (key in props) options[key] = props[key]
    delete remaining[key]
  }
  return [options as TooltipOptions, remaining as Omit<T, keyof TooltipOptions>] as const
}
