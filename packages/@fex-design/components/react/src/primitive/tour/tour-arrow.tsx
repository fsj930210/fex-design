import { tourArrowClassName } from '@fex-design/components-styles/tour'
import { cn } from '@fex-design/utils'
import type { ComponentProps, CSSProperties, Ref } from 'react'
import { useComposedRef } from '@fex-design/react/hooks/use-composed-ref'
import { useCoreStore } from '@fex-design/react/hooks/use-core-store'
import { useMemoizedFn } from '@fex-design/react/hooks/use-memoized-fn'
import { useTourContentContext } from './tour-context'

export interface TourArrowProps extends ComponentProps<'div'> {
  ref?: Ref<HTMLDivElement>
}

export function TourArrow({ className, style, ref, ...props }: TourArrowProps) {
  const { floating, snapshot } = useTourContentContext('TourArrow')
  useCoreStore(floating)
  const setArrowElement = useMemoizedFn((element: HTMLDivElement | null) =>
    floating.setArrowElement(element),
  )
  const arrowRef = useComposedRef(setArrowElement, ref)
  const sideStyle: CSSProperties =
    snapshot.side === 'top'
      ? {
          bottom: -6,
          left: 'var(--floating-arrow-x, 50%)',
          borderLeft: '6px solid transparent',
          borderRight: '6px solid transparent',
          borderTop: '6px solid var(--background)',
        }
      : snapshot.side === 'bottom'
        ? {
            top: -6,
            left: 'var(--floating-arrow-x, 50%)',
            borderLeft: '6px solid transparent',
            borderRight: '6px solid transparent',
            borderBottom: '6px solid var(--background)',
          }
        : snapshot.side === 'left'
          ? {
              right: -6,
              top: 'var(--floating-arrow-y, 50%)',
              borderTop: '6px solid transparent',
              borderBottom: '6px solid transparent',
              borderLeft: '6px solid var(--background)',
            }
          : {
              left: -6,
              top: 'var(--floating-arrow-y, 50%)',
              borderTop: '6px solid transparent',
              borderBottom: '6px solid transparent',
              borderRight: '6px solid var(--background)',
            }
  return (
    <div
      {...props}
      ref={arrowRef}
      data-slot="tour-arrow"
      data-side={snapshot.side}
      className={cn(tourArrowClassName, className)}
      style={{ ...sideStyle, ...style }}
    />
  )
}
