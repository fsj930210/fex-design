import { For, Show, createMemo, splitProps } from 'solid-js'
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
import { mergeStyle } from '@fex-design/solid/primitives/merge-style'

const axes = ['x', 'y'] as const

export function Scrollbar(props: ScrollbarProps) {
  const [local, rootProps] = splitProps(props, [
    'horizontalBarProps',
    'verticalBarProps',
    'horizontalTrackProps',
    'verticalTrackProps',
    'horizontalThumbProps',
    'verticalThumbProps',
    'cornerProps',
    'children',
    'viewportProps',
    'classNames',
    'styles',
  ])
  const resolved = createMemo(() =>
    resolveScrollbarOverflow(local.viewportProps?.overflow, props.overflow),
  )
  return (
    <ScrollbarRoot {...rootProps}>
      <ScrollbarViewport
        {...local.viewportProps}
        class={cn(local.classNames?.viewport, local.viewportProps?.class)}
        style={mergeStyle(local.styles?.viewport, local.viewportProps?.style)}
      >
        {local.children}
      </ScrollbarViewport>
      <For each={axes}>
        {(axis) => (
          <Show when={resolved()[axis] === 'auto'}>
            <ScrollbarBar
              {...(axis === 'x' ? local.horizontalBarProps : local.verticalBarProps)}
              axis={axis}
              class={cn(
                local.classNames?.[axis === 'x' ? 'barX' : 'barY'],
                (axis === 'x' ? local.horizontalBarProps : local.verticalBarProps)?.class,
              )}
              style={mergeStyle(
                local.styles?.[axis === 'x' ? 'barX' : 'barY'],
                (axis === 'x' ? local.horizontalBarProps : local.verticalBarProps)?.style,
              )}
            >
              <ScrollbarTrack
                {...(axis === 'x' ? local.horizontalTrackProps : local.verticalTrackProps)}
                axis={axis}
                class={cn(
                  local.classNames?.[axis === 'x' ? 'trackX' : 'trackY'],
                  (axis === 'x' ? local.horizontalTrackProps : local.verticalTrackProps)?.class,
                )}
                style={mergeStyle(
                  local.styles?.[axis === 'x' ? 'trackX' : 'trackY'],
                  (axis === 'x' ? local.horizontalTrackProps : local.verticalTrackProps)?.style,
                )}
              >
                <ScrollbarThumb
                  {...(axis === 'x' ? local.horizontalThumbProps : local.verticalThumbProps)}
                  axis={axis}
                  class={cn(
                    local.classNames?.[axis === 'x' ? 'thumbX' : 'thumbY'],
                    (axis === 'x' ? local.horizontalThumbProps : local.verticalThumbProps)?.class,
                  )}
                  style={mergeStyle(
                    local.styles?.[axis === 'x' ? 'thumbX' : 'thumbY'],
                    (axis === 'x' ? local.horizontalThumbProps : local.verticalThumbProps)?.style,
                  )}
                />
              </ScrollbarTrack>
            </ScrollbarBar>
          </Show>
        )}
      </For>
      <Show when={resolved().x === 'auto' && resolved().y === 'auto'}>
        <ScrollbarCorner
          {...local.cornerProps}
          class={cn(local.classNames?.corner, local.cornerProps?.class)}
          style={mergeStyle(local.styles?.corner, local.cornerProps?.style)}
        />
      </Show>
    </ScrollbarRoot>
  )
}
