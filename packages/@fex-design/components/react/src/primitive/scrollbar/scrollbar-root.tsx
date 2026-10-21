import type { ScrollbarRootOptions, ScrollbarScrollDetail } from '@fex-design/core/scrollbar/types'
import { scrollbarRootClassName } from '@fex-design/components-styles/scrollbar'
import { cn } from '@fex-design/utils'
import { useMemo, type HTMLAttributes, type Ref } from 'react'
import { useComposedRef } from '@fex-design/react/hooks/use-composed-ref'
import { ScrollbarContext } from './scrollbar-context'
import { useScrollbar } from './use-scrollbar'

export interface ScrollbarRootProps
  extends HTMLAttributes<HTMLDivElement>, Omit<ScrollbarRootOptions, 'onScroll'> {
  ref?: Ref<HTMLDivElement>
  onScrollChange?: (detail: ScrollbarScrollDetail) => void
}

export function ScrollbarRoot({
  showTrack = false,
  showCorner,
  overflow,
  visibility,
  autoHide,
  autoHideDelay,
  dragScroll,
  clickScroll,
  minThumbSize,
  disabled,
  onScrollChange,
  className,
  ref,
  children,
  ...props
}: ScrollbarRootProps) {
  const { rootRef } = useScrollbar({
    visibility,
    autoHide,
    autoHideDelay,
    dragScroll,
    clickScroll,
    minThumbSize,
    disabled,
    onScroll: onScrollChange,
  })
  const composedRef = useComposedRef(rootRef, ref)
  // Keep context stable when unrelated Root props change; only axes affect descendants.
  const context = useMemo(
    () => ({ overflow: { x: overflow?.x, y: overflow?.y } }),
    [overflow?.x, overflow?.y],
  )

  return (
    <ScrollbarContext value={context}>
      <div
        {...props}
        ref={composedRef}
        data-slot="scrollbar-root"
        data-show-track={showTrack}
        data-show-corner={showCorner ?? showTrack}
        className={cn(scrollbarRootClassName, className)}
      >
        {children}
      </div>
    </ScrollbarContext>
  )
}
