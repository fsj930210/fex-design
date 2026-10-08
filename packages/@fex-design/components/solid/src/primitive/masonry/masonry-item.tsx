import type { MasonryKey } from '@fex-design/core/masonry/types'
import { masonryItemClassName } from '@fex-design/components-styles/masonry'
import { cn } from '@fex-design/utils'
import {
  createEffect,
  createMemo,
  onCleanup,
  onMount,
  splitProps,
  type JSX,
  type ParentProps,
} from 'solid-js'
import { createCoreStoreSignal } from '@fex-design/solid/primitives/create-core-store-signal'
import { useMasonryContext } from './masonry-context'

export interface MasonryItemProps extends ParentProps<JSX.HTMLAttributes<HTMLDivElement>> {
  itemKey: MasonryKey
  index: number
  column?: number
}

export function MasonryItem(props: MasonryItemProps) {
  const [local, attrs] = splitProps(props, [
    'itemKey',
    'index',
    'column',
    'class',
    'style',
    'children',
  ])
  const { controller } = useMasonryContext('MasonryItem'),
    snapshot = createCoreStoreSignal(controller)
  const position = createMemo(() => snapshot().items.find((item) => item.key === local.itemKey))
  let element!: HTMLDivElement
  onMount(() => {
    const commit = (height: number) =>
      controller.setItem({ key: local.itemKey, index: local.index, column: local.column, height })
    const observer = new ResizeObserver(([entry]) =>
      commit(entry?.borderBoxSize[0]?.blockSize ?? entry?.contentRect.height ?? 0),
    )
    observer.observe(element)
    commit(element.getBoundingClientRect().height)
    onCleanup(() => {
      observer.disconnect()
      controller.removeItem(local.itemKey)
    })
  })
  createEffect(() => {
    local.index
    local.column
    if (element)
      controller.setItem({
        key: local.itemKey,
        index: local.index,
        column: local.column,
        height: element.getBoundingClientRect().height,
      })
  })
  return (
    <div
      {...attrs}
      ref={element}
      data-slot="masonry-item"
      data-column={position()?.column}
      class={cn(masonryItemClassName, local.class)}
      style={{
        ...(local.style as JSX.CSSProperties),
        visibility: position() ? undefined : 'hidden',
        '--masonry-inline-start': `${position()?.inlineStart ?? 0}px`,
        '--masonry-top': `${position()?.top ?? 0}px`,
        '--masonry-item-width': `${position()?.width ?? snapshot().columnWidth}px`,
      }}
    >
      {local.children}
    </div>
  )
}
