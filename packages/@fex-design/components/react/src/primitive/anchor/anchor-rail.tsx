import { anchorRailClassName } from '@fex-design/components-styles/anchor'
import { cn } from '@fex-design/utils'
import type { HTMLAttributes } from 'react'
import { useAnchorContext } from './anchor-context'

export function AnchorRail({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  const anchor = useAnchorContext('AnchorRail')
  return (
    <div
      {...props}
      aria-hidden="true"
      data-slot="anchor-rail"
      className={cn(anchorRailClassName({ orientation: anchor.orientation }), className)}
    >
      {children}
    </div>
  )
}
