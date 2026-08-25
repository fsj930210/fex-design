import { buttonClassName } from '@fex-design/styles/button'
import { cn } from '@fex/utils'
import { splitProps } from 'solid-js'
import type { ButtonProps } from './button.types'

export function Button(props: ButtonProps) {
  const [local, rest] = splitProps(props, ['class', 'children', 'type', 'variant', 'color'])
  const variant = () => local.variant ?? 'outlined'
  const color = () => local.color

  return (
    <button
      data-slot="button"
      {...rest}
      type={local.type ?? 'button'}
      class={cn(buttonClassName({ variant: variant(), color: color() }), local.class)}
      data-variant={variant()}
      data-color={color()}
    >
      {local.children}
    </button>
  )
}
