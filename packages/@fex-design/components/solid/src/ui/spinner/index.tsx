import type { SpinnerContainerOptions, SpinnerOptions } from '@fex-design/core/spinner/types'
import { spinnerContainerClassName } from '@fex-design/components-styles/spinner'
import { cn } from '@fex-design/utils'
import type { JSX } from 'solid-js'
import { Show, splitProps } from 'solid-js'
import { mergeStyle } from '@fex-design/solid/primitives/merge-style'
import {
  Spinner,
  SpinnerContainer as PrimitiveSpinnerContainer,
  SpinnerOverlay,
  SpinnerText,
} from '@fex-design/solid/primitive/spinner'
export { Spinner }
export function SpinnerContainer(
  props: JSX.HTMLAttributes<HTMLDivElement> &
    SpinnerContainerOptions<JSX.Element, JSX.CSSProperties> &
    SpinnerOptions,
) {
  const [local, rest] = splitProps(props, [
    'class',
    'children',
    'spinning',
    'text',
    'indicator',
    'size',
    'classNames',
    'styles',
  ])
  return (
    <Show when={local.spinning !== undefined} fallback={
      <Spinner
        {...rest}
        size={local.size}
        class={cn(local.class, local.classNames?.spinner)}
        style={mergeStyle(rest.style, local.styles?.spinner)}
      >
        {local.indicator}
      </Spinner>
    }>
    <PrimitiveSpinnerContainer
      {...rest}
      aria-busy={local.spinning}
      class={cn(spinnerContainerClassName, local.class, local.classNames?.root)}
      style={mergeStyle(rest.style, local.styles?.root)}
    >
      {local.children}
      <Show when={local.spinning}>
        <SpinnerOverlay
          class={cn(local.classNames?.overlay, local.text && 'flex-col')}
          style={local.styles?.overlay}
        >
          <Spinner
            size={local.size}
            class={local.classNames?.spinner}
            style={local.styles?.spinner}
          >
            {local.indicator}
          </Spinner>
          <Show when={local.text}>
            <SpinnerText class={local.classNames?.text} style={local.styles?.text}>
              {local.text}
            </SpinnerText>
          </Show>
        </SpinnerOverlay>
      </Show>
    </PrimitiveSpinnerContainer>
    </Show>
  )
}
