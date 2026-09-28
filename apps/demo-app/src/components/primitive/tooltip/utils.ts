import { createFloatingOverlay, type FloatingOverlay, type FloatingOverlayOptions } from '@/lib/utils/shared/overlay/create-floating-overlay'
import { type FloatingAlign, type FloatingSide } from '@/lib/utils/shared/floating/placement'

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

export interface TooltipOptions extends Omit<
  FloatingOverlayOptions,
  'allowedTriggers' | 'arrow' | 'dismiss' | 'modal' | 'trigger'
> {}

export type TooltipSemanticPart = 'root' | 'arrow'
export type TooltipClassNames = Partial<Record<TooltipSemanticPart, string>>

export type Tooltip = Omit<FloatingOverlay, 'setOptions'> & {
  setOptions: (options: TooltipOptions) => void
}

export function getTooltipArrowPosition(side: FloatingSide, _align: FloatingAlign) {
  const align = _align
  const edgeOffset = 'var(--tooltip-arrow-edge-offset-y, clamp(14px, 25%, 24px))'
  const centeredArrowX =
    'calc(var(--floating-arrow-x, calc(50% - var(--floating-arrow-size, 8px) / 2)) + var(--floating-arrow-size, 8px) / 2)'
  const centeredArrowY =
    'calc(var(--floating-arrow-y, calc(50% - var(--floating-arrow-size, 8px) / 2)) + var(--floating-arrow-size, 8px) / 2)'
  if (side === 'left' || side === 'right') {
    return {
      top:
        align === 'start'
          ? edgeOffset
          : align === 'end'
            ? `calc(100% - ${edgeOffset})`
            : centeredArrowY,
    }
  }
  if (align === 'center') {
    return { left: centeredArrowX }
  }
  return {}
}

function toFloatingOverlayOptions(options: TooltipOptions): FloatingOverlayOptions {
  return {
    ...options,
    // Tooltip is a non-interactive description. Its trigger contract is deliberately narrower
    // than Popover so adapters cannot accidentally add click or context-menu behavior.
    trigger: ['hover', 'focus'],
    allowedTriggers: ['hover', 'focus'],
    arrow: true,
    arrowPadding: options.arrowPadding ?? 8,
    modal: false,
    dismiss: { escapeKey: true, outsidePointer: false },
    placement: options.placement ?? 'top',
    sideOffset: options.sideOffset ?? 6,
    hoverOpenDelay: options.hoverOpenDelay ?? 400,
    hoverCloseDelay: options.hoverCloseDelay ?? 100,
    closeDelay: options.closeDelay ?? 100,
  }
}

export function createTooltip(options: TooltipOptions = {}): Tooltip {
  const overlay = createFloatingOverlay(toFloatingOverlayOptions(options))
  return {
    ...overlay,
    setOptions: (nextOptions) => overlay.setOptions(toFloatingOverlayOptions(nextOptions)),
  }
}
