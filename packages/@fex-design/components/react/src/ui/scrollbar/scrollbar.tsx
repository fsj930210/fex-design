import { resolveScrollbarOverflow } from '@fex-design/core/scrollbar/create-scrollbar-controller'
import { cn } from '@fex-design/utils'
import {
  ScrollbarRoot,
  ScrollbarViewport,
  ScrollbarBar,
  ScrollbarTrack,
  ScrollbarThumb,
  ScrollbarCorner,
} from '../../primitive/scrollbar'
import type { ScrollbarProps } from './types'

const axes = ['x', 'y'] as const

export function Scrollbar({
  children,
  overflow,
  viewportProps,
  horizontalBarProps,
  verticalBarProps,
  horizontalTrackProps,
  verticalTrackProps,
  horizontalThumbProps,
  verticalThumbProps,
  cornerProps,
  classNames,
  styles,
  ...rootProps
}: ScrollbarProps) {
  const resolved = resolveScrollbarOverflow(viewportProps?.overflow, overflow)
  return (
    <ScrollbarRoot {...rootProps} overflow={overflow}>
      <ScrollbarViewport
        {...viewportProps}
        className={cn(classNames?.viewport, viewportProps?.className)}
        style={{ ...styles?.viewport, ...viewportProps?.style }}
      >
        {children}
      </ScrollbarViewport>
      {axes.map((axis) =>
        resolved[axis] === 'auto' ? (
          <ScrollbarBar
            {...(axis === 'x' ? horizontalBarProps : verticalBarProps)}
            key={axis}
            axis={axis}
            className={cn(
              classNames?.[axis === 'x' ? 'barX' : 'barY'],
              (axis === 'x' ? horizontalBarProps : verticalBarProps)?.className,
            )}
            style={{
              ...styles?.[axis === 'x' ? 'barX' : 'barY'],
              ...(axis === 'x' ? horizontalBarProps : verticalBarProps)?.style,
            }}
          >
            <ScrollbarTrack
              {...(axis === 'x' ? horizontalTrackProps : verticalTrackProps)}
              axis={axis}
              className={cn(
                classNames?.[axis === 'x' ? 'trackX' : 'trackY'],
                (axis === 'x' ? horizontalTrackProps : verticalTrackProps)?.className,
              )}
              style={{
                ...styles?.[axis === 'x' ? 'trackX' : 'trackY'],
                ...(axis === 'x' ? horizontalTrackProps : verticalTrackProps)?.style,
              }}
            >
              <ScrollbarThumb
                {...(axis === 'x' ? horizontalThumbProps : verticalThumbProps)}
                axis={axis}
                className={cn(
                  classNames?.[axis === 'x' ? 'thumbX' : 'thumbY'],
                  (axis === 'x' ? horizontalThumbProps : verticalThumbProps)?.className,
                )}
                style={{
                  ...styles?.[axis === 'x' ? 'thumbX' : 'thumbY'],
                  ...(axis === 'x' ? horizontalThumbProps : verticalThumbProps)?.style,
                }}
              />
            </ScrollbarTrack>
          </ScrollbarBar>
        ) : null,
      )}
      {resolved.x === 'auto' && resolved.y === 'auto' && (
        <ScrollbarCorner
          {...cornerProps}
          className={cn(classNames?.corner, cornerProps?.className)}
          style={{ ...styles?.corner, ...cornerProps?.style }}
        />
      )}
    </ScrollbarRoot>
  )
}
