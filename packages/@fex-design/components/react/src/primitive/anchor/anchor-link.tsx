import { anchorLinkClassName } from '@fex-design/components-styles/anchor'
import { cn } from '@fex-design/utils'
import { use, type ButtonHTMLAttributes } from 'react'
import { AnchorItemContext, useAnchorContext } from './anchor-context'

export type AnchorLinkProps = ButtonHTMLAttributes<HTMLButtonElement>

export function AnchorLink({ className, children, onClick, ...props }: AnchorLinkProps) {
  const anchor = useAnchorContext('AnchorLink')
  const item = use(AnchorItemContext)
  if (!item) throw new Error('AnchorLink must be used inside AnchorItem')
  const active = anchor.activeKeys.includes(item.key)
  const highlighted = anchor.highlightedKeys.has(item.key)
  return (
    <button
      {...props}
      type={props.type ?? 'button'}
      data-slot="anchor-link"
      data-anchor-key={item.key}
      data-state={active ? 'active' : 'inactive'}
      className={cn(
        anchorLinkClassName({ orientation: anchor.orientation, active: highlighted }),
        className,
      )}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented) anchor.activate(item)
      }}
    >
      {children}
    </button>
  )
}
