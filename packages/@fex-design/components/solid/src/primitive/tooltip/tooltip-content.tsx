import { onCleanup, Show, splitProps, type JSX, type ParentProps } from 'solid-js'
import { tooltipContentClassName } from '@fex-design/components-styles/tooltip'
import { cn } from '@fex-design/utils'
import { useTooltip } from './tooltip-context'
import { eventInfo } from './event-info'

export interface TooltipContentProps extends ParentProps, JSX.HTMLAttributes<HTMLDivElement> {
  color?: string
}

export function TooltipContent(props: TooltipContentProps) {
  const [local, rest] = splitProps(props, [
    'children',
    'class',
    'style',
    'color',
    'onPointerEnter',
    'onPointerLeave',
  ])
  const { contentId, overlay, snapshot } = useTooltip('TooltipContent')
  onCleanup(() => overlay.setFloatingElement(null))
  return (
    <Show when={snapshot().mounted}>
      <div
        {...rest}
        id={contentId}
        ref={(element) =>
          queueMicrotask(() => element.isConnected && overlay.setFloatingElement(element))
        }
        role="tooltip"
        data-slot="tooltip-content"
        data-state={snapshot().open ? 'open' : 'closed'}
        data-phase={snapshot().phase}
        data-side={snapshot().side}
        data-align={snapshot().align}
        data-placement={snapshot().placement}
        class={cn(tooltipContentClassName, local.class)}
        onPointerEnter={(event) => {
          if (typeof local.onPointerEnter === 'function') local.onPointerEnter(event)
          if (!event.defaultPrevented) overlay.content.pointerEnter(eventInfo(event))
        }}
        onPointerLeave={(event) => {
          if (typeof local.onPointerLeave === 'function') local.onPointerLeave(event)
          if (!event.defaultPrevented) overlay.content.pointerLeave(eventInfo(event))
        }}
        style={
          typeof local.style === 'string'
            ? `position:var(--floating-strategy, absolute);left:var(--floating-x, 0px);top:var(--floating-y, 0px);transform-origin:var(--floating-transform-origin);${local.color ? `--tooltip-background:${local.color};` : ''}${local.style}`
            : {
                position: 'var(--floating-strategy, absolute)',
                left: 'var(--floating-x, 0px)',
                top: 'var(--floating-y, 0px)',
                'transform-origin': 'var(--floating-transform-origin)',
                ...(local.color ? { '--tooltip-background': local.color } : {}),
                ...(local.style ?? {}),
              }
        }
      >
        {local.children}
      </div>
    </Show>
  )
}
