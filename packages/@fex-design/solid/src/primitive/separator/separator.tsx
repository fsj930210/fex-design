import { separatorClassName } from '@fex-design/styles/separator'
import { cn } from '@fex/utils'
import { splitProps, type JSX } from 'solid-js'
import type { SeparatorOptions } from '@fex-design/core/separator/types'
export function Separator(
  props: JSX.HTMLAttributes<HTMLDivElement> & SeparatorOptions,
) {
  const [local, rest] = splitProps(props, ['class', 'orientation'])
  const orientation = () => local.orientation ?? 'horizontal'
  return (
    <div
      {...rest}
      role="separator"
      aria-orientation={orientation()}
      data-slot="separator"
      data-orientation={orientation()}
      class={cn(separatorClassName, local.class)}
    />
  )
}
