import type {
  ScrollbarRootOptions,
  ScrollbarScrollDetail,
} from '@fex-design/core/scrollbar/types'
import { scrollbarRootClassName } from '@fex-design/components-styles/scrollbar'
import { cn } from '@fex-design/utils'
import { splitProps, type JSX, type ParentProps } from 'solid-js'
import { createScrollbar } from './create-scrollbar'
import { ScrollbarContext } from './scrollbar-context'

export type ScrollbarRootProps = ParentProps<JSX.HTMLAttributes<HTMLDivElement>> & Omit<ScrollbarRootOptions, 'onScroll'> & {
  onScrollChange?: (detail: ScrollbarScrollDetail) => void
}

export function ScrollbarRoot(props: ScrollbarRootProps) {
  const [local, rest] = splitProps(props, [
    'showTrack',
    'showCorner',
    'class',
    'ref',
    'overflow',
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
  const binding = createScrollbar(() => ({
    visibility: local.visibility,
    autoHide: local.autoHide,
    autoHideDelay: local.autoHideDelay,
    dragScroll: local.dragScroll,
    clickScroll: local.clickScroll,
    minThumbSize: local.minThumbSize,
    disabled: local.disabled,
    onScroll: (detail) => local.onScrollChange?.(detail),
  }))
  return (
    <ScrollbarContext.Provider value={() => local.overflow}>
      <div
        {...rest}
        ref={(element) => {
          binding.rootRef(element)
          if (typeof local.ref === 'function') local.ref(element)
        }}
        data-slot="scrollbar-root"
        data-show-track={local.showTrack ?? false}
        data-show-corner={local.showCorner ?? local.showTrack ?? false}
        class={cn(scrollbarRootClassName, local.class)}
      >
        {local.children}
      </div>
    </ScrollbarContext.Provider>
  )
}
