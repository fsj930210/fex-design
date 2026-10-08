import {
  createMasonryController,
} from '@fex-design/core/masonry/create-masonry-controller'
import type { MasonryControllerOptions } from '@fex-design/core/masonry/types'
import { masonryRootClassName } from '@fex-design/components-styles/masonry'
import { cn } from '@fex-design/utils'
import {
  createEffect,
  onCleanup,
  onMount,
  splitProps,
  type JSX,
  type ParentProps,
} from 'solid-js'
import { MasonryContext } from './masonry-context'

export type MasonryRootProps = ParentProps<
  JSX.HTMLAttributes<HTMLDivElement> & MasonryControllerOptions
>

export function MasonryRoot(props: MasonryRootProps) {
  const [local, attrs] = splitProps(props, [
    'columns',
    'gap',
    'placement',
    'direction',
    'onLayoutChange',
    'class',
    'children',
  ])
  const controller = createMasonryController()
  let element!: HTMLDivElement
  const options = () => ({
    columns: local.columns,
    gap: local.gap,
    placement: local.placement,
    direction: local.direction ?? 'ltr',
    onLayoutChange: local.onLayoutChange,
  })
  createEffect(() => controller.setOptions(options()))
  onMount(() => {
    const observer = new ResizeObserver(([entry]) =>
      controller.setWidth(entry?.contentRect.width ?? 0),
    )
    observer.observe(element)
    onCleanup(() => observer.disconnect())
  })
  onCleanup(() => controller.destroy())
  return (
    <MasonryContext.Provider value={{ controller, options }}>
      <div
        {...attrs}
        ref={element}
        dir={local.direction ?? 'ltr'}
        data-slot="masonry"
        class={cn(masonryRootClassName, local.class)}
      >
        {local.children}
      </div>
    </MasonryContext.Provider>
  )
}
