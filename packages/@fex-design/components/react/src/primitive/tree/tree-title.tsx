import { treeTitleClassName } from '@fex-design/components-styles/tree'
import { cn } from '@fex-design/utils'
import type { HTMLAttributes } from 'react'

export interface TreeTitleProps extends HTMLAttributes<HTMLSpanElement> {}

export function TreeTitle({ className, ...props }: TreeTitleProps) {
  return <span {...props} data-slot="tree-title" className={cn(treeTitleClassName, className)} />
}
