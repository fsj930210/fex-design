import { createScrollbarController } from '@fex-design/core/scrollbar/create-scrollbar-controller'
import type {
  ScrollbarAutoHide,
  ScrollbarClickScroll,
  ScrollbarScrollDetail,
  ScrollbarVisibility,
} from '@fex-design/core/scrollbar/types'
import { scrollbarRootClassName } from '@fex-design/components-styles/scrollbar'
import { cn } from '@fex-design/utils'
import {
  useEffect,
  useEffectEvent,
  useRef,
  type HTMLAttributes,
  type Ref,
} from 'react'
import { useComposedRef } from '@fex-design/react/hooks/use-composed-ref'
import { ScrollbarContext, type Overflow } from './scrollbar-context'

export interface ScrollbarRootProps extends HTMLAttributes<HTMLDivElement> {
  overflow?: { x?: Overflow; y?: Overflow }
  visibility?: ScrollbarVisibility
  autoHide?: ScrollbarAutoHide
  autoHideDelay?: number
  dragScroll?: boolean
  clickScroll?: ScrollbarClickScroll
  minThumbSize?: number
  disabled?: boolean
  ref?: Ref<HTMLDivElement>
  onScrollChange?: (detail: ScrollbarScrollDetail) => void
}

export function ScrollbarRoot({
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
  const rootRef = useRef<HTMLDivElement | null>(null)
  const composedRef = useComposedRef(rootRef, ref)
  const emitScrollChange = useEffectEvent((detail: ScrollbarScrollDetail) =>
    onScrollChange?.(detail),
  )

  useEffect(() => {
    if (!rootRef.current) return
    const controller = createScrollbarController({
      visibility,
      autoHide,
      autoHideDelay,
      dragScroll,
      clickScroll,
      minThumbSize,
      disabled,
      onScroll: emitScrollChange,
    })
    return controller.connect(rootRef.current)
  }, [visibility, autoHide, autoHideDelay, dragScroll, clickScroll, minThumbSize, disabled])

  return (
    <ScrollbarContext value={{ rootRef, overflow }}>
      <div
        {...props}
        ref={composedRef}
        data-slot="scrollbar-root"
        className={cn(scrollbarRootClassName, className)}
      >
        {children}
      </div>
    </ScrollbarContext>
  )
}
