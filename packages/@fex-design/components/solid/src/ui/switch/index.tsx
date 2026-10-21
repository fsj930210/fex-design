import { mergeStyle } from '@fex-design/solid/primitives/merge-style'
import type { SwitchUiOptions } from '@fex-design/core/switch/types'
import { cn } from '@fex-design/utils'
import { Show, splitProps, type ComponentProps, type JSX } from 'solid-js'
import {
  SwitchRoot,
  SwitchContent,
  SwitchThumb,
  type SwitchRootProps,
} from '@fex-design/solid/primitive/switch'
import { Spinner } from '@fex-design/solid/primitive/spinner'
export type SwitchProps = Omit<SwitchRootProps, 'children'> &
  SwitchUiOptions<JSX.Element, JSX.CSSProperties> & {
    checkedContentProps?:
      | Omit<ComponentProps<typeof SwitchContent>, 'children' | 'state'>
      | undefined
    uncheckedContentProps?:
      | Omit<ComponentProps<typeof SwitchContent>, 'children' | 'state'>
      | undefined
    thumbProps?: Omit<ComponentProps<typeof SwitchThumb>, 'children'> | undefined
    spinnerProps?: Omit<ComponentProps<typeof Spinner>, 'aria-hidden'> | undefined
  }
export function Switch(props: SwitchProps) {
  const [local, rest] = splitProps(props, [
    'checkedContentProps',
    'uncheckedContentProps',
    'thumbProps',
    'spinnerProps',
    'checkedContent',
    'uncheckedContent',
    'class',
    'style',
    'classNames',
    'styles',
  ])
  return (
    <SwitchRoot
      {...rest}
      class={cn(local.class, local.classNames?.root)}
      style={mergeStyle(local.style, local.styles?.root)}
    >
      <Show when={local.checkedContent != null}>
        <SwitchContent
          {...local.checkedContentProps}
          state="checked"
          class={cn(local.classNames?.content, local.checkedContentProps?.class)}
          style={mergeStyle(local.styles?.content, local.checkedContentProps?.style)}
        >
          {local.checkedContent}
        </SwitchContent>
      </Show>
      <Show when={local.uncheckedContent != null}>
        <SwitchContent
          {...local.uncheckedContentProps}
          state="unchecked"
          class={cn(local.classNames?.content, local.uncheckedContentProps?.class)}
          style={mergeStyle(local.styles?.content, local.uncheckedContentProps?.style)}
        >
          {local.uncheckedContent}
        </SwitchContent>
      </Show>
      <SwitchThumb
        {...local.thumbProps}
        class={cn(local.classNames?.thumb, local.thumbProps?.class)}
        style={mergeStyle(local.styles?.thumb, local.thumbProps?.style)}
      >
        <Show when={props.loading}>
          <Spinner {...local.spinnerProps} aria-hidden="true" />
        </Show>
      </SwitchThumb>
    </SwitchRoot>
  )
}
