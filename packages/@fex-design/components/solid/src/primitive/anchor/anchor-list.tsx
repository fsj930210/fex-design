import { anchorListClassName } from '@fex-design/components-styles/anchor'
import { cn } from '@fex-design/utils'
import { splitProps, type JSX, type ParentProps } from 'solid-js'
import { useAnchorContext } from './anchor-context'

export function AnchorList(props: ParentProps<JSX.HTMLAttributes<HTMLUListElement>>) {
  const anchor = useAnchorContext('AnchorList')
  const [local, rest] = splitProps(props, ['class', 'children'])
  return (
    <ul
      {...rest}
      data-slot="anchor-list"
      class={cn(anchorListClassName({ orientation: anchor.orientation() }), local.class)}
    >
      {local.children}
    </ul>
  )
}
