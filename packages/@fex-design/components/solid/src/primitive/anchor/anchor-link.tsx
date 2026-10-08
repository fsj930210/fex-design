import { anchorLinkClassName } from '@fex-design/components-styles/anchor'
import { cn } from '@fex-design/utils'
import { splitProps, useContext, type JSX, type ParentProps } from 'solid-js'
import { AnchorItemContext, useAnchorContext } from './anchor-context'

export function AnchorLink(props: ParentProps<JSX.ButtonHTMLAttributes<HTMLButtonElement>>) {
  const anchor = useAnchorContext('AnchorLink')
  const item = useContext(AnchorItemContext)
  if (!item) throw new Error('AnchorLink must be used inside AnchorItem')
  const [local, rest] = splitProps(props, ['class', 'children', 'onClick'])
  return (
    <button
      {...rest}
      type={rest.type ?? 'button'}
      data-slot="anchor-link"
      data-anchor-key={item.key}
      data-state={anchor.activeKeys().includes(item.key) ? 'active' : 'inactive'}
      class={cn(
        anchorLinkClassName({
          orientation: anchor.orientation(),
          active: anchor.highlightedKeys().has(item.key),
        }),
        local.class,
      )}
      onClick={(event) => {
        if (typeof local.onClick === 'function') local.onClick(event)
        if (!event.defaultPrevented) anchor.activate(item)
      }}
    >
      {local.children}
    </button>
  )
}
