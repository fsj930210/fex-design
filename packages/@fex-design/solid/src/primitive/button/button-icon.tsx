import { buttonIconClassName } from '@fex-design/styles/button'
import { cn } from '@fex/utils'
import { splitProps } from 'solid-js'
import type { ButtonIconProps } from './button.types'

export function ButtonIcon(props: ButtonIconProps) {
  const [local, rest] = splitProps(props, ['class', 'children', 'placement', 'data-icon'])

  return (
    <span
      {...rest}
      class={cn(buttonIconClassName(), local.class)}
      data-icon={local['data-icon'] ?? (local.placement === 'end' ? 'inline-end' : 'inline-start')}
    >
      {local.children}
    </span>
  )
}
