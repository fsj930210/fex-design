import { anchorRailClassName } from '@fex-design/components-styles/anchor'
import { cn } from '@fex-design/utils'
import { splitProps, type JSX, type ParentProps } from 'solid-js'
import { useAnchorContext } from './anchor-context'

export function AnchorRail(props: ParentProps<JSX.HTMLAttributes<HTMLDivElement>>) {
  const anchor = useAnchorContext('AnchorRail')
  const [local, rest] = splitProps(props, ['class', 'children'])
  return (
    <div
      {...rest}
      aria-hidden="true"
      data-slot="anchor-rail"
      class={cn(anchorRailClassName({ orientation: anchor.orientation() }), local.class)}
    >
      {local.children}
    </div>
  )
}
