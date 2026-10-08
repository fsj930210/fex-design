import { createScrollbarController } from '@fex-design/core/scrollbar/create-scrollbar-controller'
import type {
  ScrollbarAutoHide,
  ScrollbarClickScroll,
  ScrollbarVisibility,
} from '@fex-design/core/scrollbar/types'
import { scrollbarRootClassName } from '@fex-design/components-styles/scrollbar'
import { cn } from '@fex-design/utils'
import { onCleanup, onMount, splitProps, type JSX, type ParentProps } from 'solid-js'

export interface ScrollbarRootProps extends ParentProps<JSX.HTMLAttributes<HTMLDivElement>> {
  visibility?: ScrollbarVisibility
  autoHide?: ScrollbarAutoHide
  autoHideDelay?: number
  dragScroll?: boolean
  clickScroll?: ScrollbarClickScroll
  minThumbSize?: number
  disabled?: boolean
  onScrollChange?: (detail: { scrollLeft: number; scrollTop: number }) => void
}

export function ScrollbarRoot(props: ScrollbarRootProps) {
  const [local, rest] = splitProps(props, [
    'class',
    'children',
    'visibility',
    'autoHide',
    'autoHideDelay',
    'dragScroll',
    'clickScroll',
    'minThumbSize',
    'disabled',
    'onScrollChange',
  ])
  let element: HTMLDivElement | undefined = undefined
  onMount(() => {
    if (!element) return
    const controller = createScrollbarController({
      visibility: local.visibility,
      autoHide: local.autoHide,
      autoHideDelay: local.autoHideDelay,
      dragScroll: local.dragScroll,
      clickScroll: local.clickScroll,
      minThumbSize: local.minThumbSize,
      disabled: local.disabled,
      onScroll: local.onScrollChange,
    })
    const cleanup = controller.connect(element)
    onCleanup(cleanup)
  })
  return (
    <div
      {...rest}
      ref={element}
      data-slot="scrollbar-root"
      class={cn(scrollbarRootClassName, local.class)}
    >
      {local.children}
    </div>
  )
}
