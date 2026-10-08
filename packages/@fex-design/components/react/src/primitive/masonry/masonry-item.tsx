import {
  useEffect,
  useRef,
  type CSSProperties,
  type HTMLAttributes,
} from 'react'
import type { MasonryKey } from '@fex-design/core/masonry/types'
import { masonryItemClassName } from '@fex-design/components-styles/masonry'
import { cn } from '@fex-design/utils'
import { useCoreStore } from '@fex-design/react/hooks/use-core-store'
import { useMasonryContext } from './masonry-context'

export interface MasonryItemProps extends HTMLAttributes<HTMLDivElement> {
  itemKey: MasonryKey
  index: number
  column?: number
}

export function MasonryItem({
  itemKey,
  index,
  column,
  className,
  style,
  ...props
}: MasonryItemProps) {
  const { controller } = useMasonryContext()
  const snapshot = useCoreStore(controller)
  const itemRef = useRef<HTMLDivElement>(null)
  const position = snapshot.items.find((item) => item.key === itemKey)

  useEffect(() => {
    const element = itemRef.current
    if (!element) return
    const commit = (height: number) => controller.setItem({ key: itemKey, index, column, height })
    const observer = new ResizeObserver(([entry]) =>
      commit(entry?.borderBoxSize[0]?.blockSize ?? entry?.contentRect.height ?? 0),
    )
    observer.observe(element)
    commit(element.getBoundingClientRect().height)
    return () => {
      observer.disconnect()
      controller.removeItem(itemKey)
    }
  }, [column, controller, index, itemKey])

  return (
    <div
      {...props}
      ref={itemRef}
      data-slot="masonry-item"
      data-column={position?.column}
      data-positioned={position ? '' : undefined}
      className={cn(masonryItemClassName, className)}
      style={
        {
          ...style,
          visibility: position ? style?.visibility : 'hidden',
          '--masonry-inline-start': `${position?.inlineStart ?? 0}px`,
          '--masonry-top': `${position?.top ?? 0}px`,
          '--masonry-item-width': `${position?.width ?? snapshot.columnWidth}px`,
        } as CSSProperties
      }
    />
  )
}
