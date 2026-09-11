import { onCleanup, Show, splitProps, type JSX } from 'solid-js'
import { cn } from '@fex/utils'
import { popoverContentClassName } from '@fex-design/styles/popover'
import { usePopover } from './popover-context'
import { eventInfo, callEventHandler } from './event-info'

export type PopoverContentProps = JSX.HTMLAttributes<HTMLDivElement>

export function PopoverContent(props: PopoverContentProps) {
  const [local, rest] = splitProps(props, ['children', 'class', 'onClick', 'role', 'style', 'ref', 'onPointerEnter', 'onPointerLeave'])
  const { contentElement, overlay, snapshot } = usePopover('PopoverContent')

  function setContentElement(element: HTMLDivElement) {
    if (!(element instanceof HTMLDivElement)) return
    // content DOM 同时是 overlay layer 和 floating element。
    contentElement.current = element
    if (typeof local.ref === 'function') local.ref(element)
    // Solid invokes refs before a Portal node is connected. Floating UI needs a connected owner document.
    queueMicrotask(() => {
      if (contentElement.current === element && element.isConnected) {
        overlay.setFloatingElement(element)
      }
    })
  }

  onCleanup(() => {
    contentElement.current = null
    overlay.setFloatingElement(null)
  })

  // 坐标由 core 写 CSS 变量，Solid adapter 不订阅 x/y，避免 autoUpdate 高频触发组件计算。
  return (
    <Show when={snapshot().mounted}>
      <div
        {...rest}
        ref={setContentElement}
        role={local.role ?? 'dialog'}
        tabIndex={-1}
        data-slot="popover-content"
        data-state={snapshot().open ? 'open' : 'closed'}
        hidden={snapshot().phase === "closed"}
        inert={!snapshot().open}
        data-phase={snapshot().phase}
        data-side={snapshot().side}
        data-align={snapshot().align}
        data-placement={snapshot().placement}
        onClick={local.onClick}
        onPointerEnter={(event) => {
          callEventHandler(local.onPointerEnter, event)
          if (!event.defaultPrevented) overlay.content.pointerEnter(eventInfo(event))
        }}
        onPointerLeave={(event) => {
          callEventHandler(local.onPointerLeave, event)
          if (!event.defaultPrevented) overlay.content.pointerLeave(eventInfo(event))
        }}
        class={cn(popoverContentClassName(), local.class)}
        style={typeof local.style === 'string'
          ? `position: var(--floating-strategy, absolute); left: var(--floating-x, 0px); top: var(--floating-y, 0px); transform-origin: var(--floating-transform-origin); ${local.style}`
          : { position: 'var(--floating-strategy, absolute)' as JSX.CSSProperties['position'], left: 'var(--floating-x, 0px)', top: 'var(--floating-y, 0px)', 'transform-origin': 'var(--floating-transform-origin)', ...local.style }}
      >
        {local.children}
      </div>
    </Show>
  )
}
