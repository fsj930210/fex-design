import { scrollbarCornerClassName } from '@fex-design/components-styles/scrollbar'
import { cn } from '@fex-design/utils'
import { splitProps, type JSX } from 'solid-js'

export function ScrollbarCorner(props: JSX.HTMLAttributes<HTMLDivElement>) {
  const [local, rest] = splitProps(props, ['class'])
  return (
    <div {...rest} data-slot="scrollbar-corner" class={cn(scrollbarCornerClassName, local.class)} />
  )
}
