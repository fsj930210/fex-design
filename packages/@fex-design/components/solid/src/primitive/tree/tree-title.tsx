import { treeTitleClassName } from '@fex-design/components-styles/tree'
import { cn } from '@fex-design/utils'
import { splitProps, type JSX, type ParentProps } from 'solid-js'

export function TreeTitle(props: ParentProps<JSX.HTMLAttributes<HTMLSpanElement>>) {
  const [local, attrs] = splitProps(props, ['class', 'children'])
  return (
    <span {...attrs} data-slot="tree-title" class={cn(treeTitleClassName, local.class)}>
      {local.children}
    </span>
  )
}
