import { For, Show, createMemo, splitProps } from 'solid-js'
import { resolveScrollbarOverflow } from '@fex-design/core/scrollbar/create-scrollbar-controller'
import { cn } from '@fex-design/utils'
import { ScrollbarRoot, ScrollbarViewport, ScrollbarBar, ScrollbarTrack, ScrollbarThumb, ScrollbarCorner } from '../../primitive/scrollbar'
import type { ScrollbarProps } from './types'
import { mergeStyle } from '@fex-design/solid/primitives/merge-style'

const axes = ['x', 'y'] as const

export function Scrollbar(props: ScrollbarProps) {
  const [local, rootProps] = splitProps(props, ['children', 'viewportProps', 'classNames', 'styles'])
  const resolved = createMemo(() => resolveScrollbarOverflow(local.viewportProps?.overflow, props.overflow))
  return (
    <ScrollbarRoot {...rootProps}>
      <ScrollbarViewport {...local.viewportProps}
        class={cn(local.classNames?.viewport, local.viewportProps?.class)}
        style={mergeStyle(local.styles?.viewport, local.viewportProps?.style)}>
        {local.children}
      </ScrollbarViewport>
      <For each={axes}>{(axis) => (
        <Show when={resolved()[axis] === 'auto'}>
          <ScrollbarBar axis={axis}
            class={local.classNames?.[axis === 'x' ? 'barX' : 'barY']}
            style={local.styles?.[axis === 'x' ? 'barX' : 'barY']}>
            <ScrollbarTrack axis={axis} class={local.classNames?.[axis === 'x' ? 'trackX' : 'trackY']} style={local.styles?.[axis === 'x' ? 'trackX' : 'trackY']}>
              <ScrollbarThumb axis={axis} class={local.classNames?.[axis === 'x' ? 'thumbX' : 'thumbY']} style={local.styles?.[axis === 'x' ? 'thumbX' : 'thumbY']} />
            </ScrollbarTrack>
          </ScrollbarBar>
        </Show>
      )}</For>
      <Show when={resolved().x === 'auto' && resolved().y === 'auto'}>
        <ScrollbarCorner class={local.classNames?.corner} style={local.styles?.corner} />
      </Show>
    </ScrollbarRoot>
  )
}
