import { buttonIconClassName } from '@fex-design/styles/button'
import { cn } from '@fex/utils'
import { splitProps } from 'solid-js'
import type { ButtonIconProps } from './button.types'

export function ButtonIcon(props: ButtonIconProps) {
  const [local, rest] = splitProps(props, ['class', 'effect', 'placement', 'children', 'data-icon'])
  const placement = () => local.placement ?? 'start'

  return (
    <span
      {...rest}
      class={cn(buttonIconClassName({ placement: placement(), effect: local.effect }), local.class)}
      data-icon={local['data-icon'] ?? `inline-${placement()}`}
    >
      {local.children}
    </span>
  )
}
