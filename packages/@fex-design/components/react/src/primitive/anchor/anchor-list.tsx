import { anchorListClassName } from '@fex-design/components-styles/anchor'
import { cn } from '@fex-design/utils'
import type { HTMLAttributes } from 'react'
import { useAnchorContext } from './anchor-context'

export function AnchorList({ className, children, ...props }: HTMLAttributes<HTMLUListElement>) {
  const anchor = useAnchorContext('AnchorList')
  return (
    <ul
      {...props}
      data-slot="anchor-list"
      className={cn(anchorListClassName({ orientation: anchor.orientation }), className)}
    >
      {children}
    </ul>
  )
}
