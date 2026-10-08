import {
  useEffect,
  useRef,
  type HTMLAttributes,
} from 'react'
import {
  createMasonryController,
} from '@fex-design/core/masonry/create-masonry-controller'
import type {
  MasonryControllerOptions,
} from '@fex-design/core/masonry/types'
import {
  masonryRootClassName,
} from '@fex-design/components-styles/masonry'
import { cn } from '@fex-design/utils'
import { useLazyRef } from '@fex-design/react/hooks/use-lazy-ref'
import { MasonryContext } from './masonry-context'

export interface MasonryRootProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'dir'>, MasonryControllerOptions {}

export function MasonryRoot({
  columns,
  gap,
  placement,
  direction = 'ltr',
  onLayoutChange,
  className,
  children,
  ...props
}: MasonryRootProps) {
  const controller = useLazyRef(() =>
    createMasonryController({ columns, gap, placement, direction, onLayoutChange }),
  ).current
  const rootRef = useRef<HTMLDivElement>(null)
  controller.setOptions({ columns, gap, placement, direction, onLayoutChange })

  useEffect(() => {
    const element = rootRef.current
    if (!element) return
    const observer = new ResizeObserver(([entry]) =>
      controller.setWidth(entry?.contentRect.width ?? 0),
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [controller])

  useEffect(() => () => controller.destroy(), [controller])

  return (
    <MasonryContext
      value={{ controller, options: { columns, gap, placement, direction, onLayoutChange } }}
    >
      <div
        {...props}
        ref={rootRef}
        dir={direction}
        data-slot="masonry"
        className={cn(masonryRootClassName, className)}
      >
        {children}
      </div>
    </MasonryContext>
  )
}
