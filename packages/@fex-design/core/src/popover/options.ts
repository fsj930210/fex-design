import type { PopoverOptions } from './types'

/** UI adapters use one list when separating behavior from native content props. */
export const popoverOptionKeys = [
  'open', 'defaultOpen', 'onOpenChange', 'trigger', 'disabled',
  'placement', 'side', 'align', 'sideOffset', 'alignOffset', 'strategy',
  'avoidCollisions', 'collisionBoundary', 'collisionPadding',
  'arrow', 'arrowPadding', 'matchReferenceWidth', 'hideWhenDetached', 'zIndex',
  'getPopupContainer', 'hoverOpenDelay', 'hoverCloseDelay', 'closeDelay', 'dismiss',
  'lazyMount', 'destroyOnHidden',
] as const satisfies readonly (keyof PopoverOptions)[]

export function splitPopoverOptions<T extends PopoverOptions>(props: T) {
  const options: Record<string, unknown> = {}
  const remaining = { ...props }
  for (const key of popoverOptionKeys) {
    if (key in props) options[key] = props[key]
    delete remaining[key]
  }
  return [options as PopoverOptions, remaining as Omit<T, keyof PopoverOptions>] as const
}
