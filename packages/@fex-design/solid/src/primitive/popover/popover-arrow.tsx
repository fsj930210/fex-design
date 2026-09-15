import { onCleanup, Show, splitProps, type JSX } from 'solid-js'
import { cn } from '@fex/utils'
import { popoverArrowClassName } from '@fex-design/styles/popover'
import { usePopover } from './popover-context'

export type PopoverArrowProps = JSX.HTMLAttributes<HTMLDivElement>

export function PopoverArrow(props: PopoverArrowProps) {
  const [local, rest] = splitProps(props, ['class', 'style', 'ref'])
  const { arrowElement, overlay, snapshot } = usePopover('PopoverArrow')
  const sideStyle = () => {
    // sideStyle 必须在 JSX 中调用，才能追踪 snapshot().side。
    return snapshot().side === 'left' || snapshot().side === 'right'
      ? {
          top: 'var(--floating-arrow-y, 0px)',
        }
      : {
          left: 'var(--floating-arrow-x, 0px)',
        }
  }

  onCleanup(() => {
    arrowElement.current = null
    overlay.setArrowElement(null)
  })

  return (
    <Show when={snapshot().arrow}>
      <div
        {...rest}
        ref={(element) => {
          // arrow DOM 是 Floating UI arrow middleware 的输入，注册后 core 会重新计算箭头坐标。
          arrowElement.current = element
          if (typeof local.ref === 'function') local.ref(element)
          overlay.setArrowElement(element)
        }}
        data-slot="popover-arrow"
        data-side={snapshot().side}
        class={cn(popoverArrowClassName, local.class)}
        style={
          typeof local.style === 'string'
            ? `${Object.entries(sideStyle())
                .map(([key, value]) => `${key}:${value}`)
                .join(';')};${local.style}`
            : { ...sideStyle(), ...local.style }
        }
      />
    </Show>
  )
}
