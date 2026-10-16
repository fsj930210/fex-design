import { resolveScrollbarOverflow } from '@fex-design/core/scrollbar/create-scrollbar-controller'
import { cn } from '@fex-design/utils'
import { ScrollbarRoot, ScrollbarViewport, ScrollbarBar, ScrollbarTrack, ScrollbarThumb, ScrollbarCorner } from '../../primitive/scrollbar'
import type { ScrollbarProps } from './types'

const axes = ['x', 'y'] as const

export function Scrollbar({ children, overflow, viewportProps, classNames, styles, ...rootProps }: ScrollbarProps) {
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
      {axes.map((axis) => resolved[axis] === 'auto' ? (
        <ScrollbarBar key={axis} axis={axis}
          className={classNames?.[axis === 'x' ? 'barX' : 'barY']}
          style={styles?.[axis === 'x' ? 'barX' : 'barY']}>
          <ScrollbarTrack axis={axis} className={classNames?.[axis === 'x' ? 'trackX' : 'trackY']} style={styles?.[axis === 'x' ? 'trackX' : 'trackY']}>
            <ScrollbarThumb axis={axis} className={classNames?.[axis === 'x' ? 'thumbX' : 'thumbY']} style={styles?.[axis === 'x' ? 'thumbX' : 'thumbY']} />
          </ScrollbarTrack>
        </ScrollbarBar>
      ) : null)}
      {resolved.x === 'auto' && resolved.y === 'auto' && (
        <ScrollbarCorner className={classNames?.corner} style={styles?.corner} />
      )}
    </ScrollbarRoot>
  )
}
