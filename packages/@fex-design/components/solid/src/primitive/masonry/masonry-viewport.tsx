import { masonryViewportClassName } from '@fex-design/components-styles/masonry'
import { cn } from '@fex-design/utils'
import { splitProps, type JSX, type ParentProps } from 'solid-js'
import { createCoreStoreSignal } from '@fex-design/solid/primitives/create-core-store-signal'
import { useMasonryContext } from './masonry-context'

export function MasonryViewport(props: ParentProps<JSX.HTMLAttributes<HTMLDivElement>>) {
  const [local, attrs] = splitProps(props, ['class', 'style', 'children'])
  const { controller } = useMasonryContext('MasonryViewport'),
    snapshot = createCoreStoreSignal(controller)
  return (
    <div
      {...attrs}
      data-slot="masonry-viewport"
      class={cn(masonryViewportClassName, local.class)}
      style={{ ...(local.style as JSX.CSSProperties), height: `${snapshot().height}px` }}
    >
      {local.children}
    </div>
  )
}
