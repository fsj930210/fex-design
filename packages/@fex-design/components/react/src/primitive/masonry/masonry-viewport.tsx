import type { HTMLAttributes } from 'react'
import { masonryViewportClassName } from '@fex-design/components-styles/masonry'
import { cn } from '@fex-design/utils'
import { useCoreStore } from '@fex-design/react/hooks/use-core-store'
import { useMasonryContext } from './masonry-context'

export function MasonryViewport({ className, style, ...props }: HTMLAttributes<HTMLDivElement>) {
  const { controller } = useMasonryContext()
  const snapshot = useCoreStore(controller)
  return (
    <div
      {...props}
      data-slot="masonry-viewport"
      className={cn(masonryViewportClassName, className)}
      style={{ ...style, height: snapshot.height }}
    />
  )
}
