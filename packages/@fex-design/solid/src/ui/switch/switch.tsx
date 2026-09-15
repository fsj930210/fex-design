import type { SwitchUiOptions } from '@fex-design/core/switch/types'
import { cn } from '@fex/utils'
import { Show, splitProps, type JSX } from 'solid-js'
import {
  SwitchRoot,
  SwitchContent,
  SwitchThumb,
  type SwitchRootProps,
} from '../../primitive/switch/switch'
import { Spinner } from '../../primitive/spinner/spinner'
export type SwitchProps = Omit<SwitchRootProps, 'children'> &
  SwitchUiOptions<JSX.Element, JSX.CSSProperties>
export function Switch(props: SwitchProps) {
  const [local, rest] = splitProps(props, [
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
      style={{ ...(typeof local.style === 'object' ? local.style : {}), ...local.styles?.root }}
    >
      <Show when={local.checkedContent != null}>
        <SwitchContent
          state="checked"
          class={local.classNames?.content}
          style={local.styles?.content}
        >
          {local.checkedContent}
        </SwitchContent>
      </Show>
      <Show when={local.uncheckedContent != null}>
        <SwitchContent
          state="unchecked"
          class={local.classNames?.content}
          style={local.styles?.content}
        >
          {local.uncheckedContent}
        </SwitchContent>
      </Show>
      <SwitchThumb class={local.classNames?.thumb} style={local.styles?.thumb}>
        <Show when={props.loading}>
          <Spinner aria-hidden="true" />
        </Show>
      </SwitchThumb>
    </SwitchRoot>
  )
}
