import { buttonPrimitiveClassName } from '@fex-design/styles/button'
import { cn } from '@fex/utils'
import { splitProps } from 'solid-js'
import type { ButtonProps } from './button.types'

export function Button(props: ButtonProps) {
  const [local, rest] = splitProps(props, ['class', 'children', 'type'])

  return (
    <button
      data-slot="button"
      {...rest}
      type={local.type ?? 'button'}
      class={cn(buttonPrimitiveClassName, local.class)}
    >
      {local.children}
    </button>
  )
}
