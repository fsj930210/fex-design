import type { SpinnerContainerOptions, SpinnerOptions } from '@fex-design/core/spinner/types'
import { spinnerContainerClassName } from '@fex-design/styles/spinner'
import { cn } from '@fex/utils'
import type { JSX } from 'solid-js'
import { Show, splitProps } from 'solid-js'
import {
  Spinner,
  SpinnerContainer as PrimitiveSpinnerContainer,
  SpinnerOverlay,
  SpinnerText,
} from '../../primitive/spinner/spinner'
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
  if (local.spinning === undefined)
    return (
      <Spinner
        {...rest}
        size={local.size}
        class={cn(local.class, local.classNames?.spinner)}
        style={local.styles?.spinner}
      >
        {local.indicator}
      </Spinner>
    )
  return (
    <PrimitiveSpinnerContainer
      {...rest}
      aria-busy={local.spinning}
      class={cn(spinnerContainerClassName, local.class, local.classNames?.root)}
      style={local.styles?.root}
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
  )
}
