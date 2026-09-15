import type { SwitchState } from '@fex-design/core/switch/types'
import { switchContentClassName } from '@fex-design/styles/switch'
import { cn } from '@fex/utils'
import { splitProps, type JSX } from 'solid-js'
export type SwitchContentProps = JSX.HTMLAttributes<HTMLSpanElement> & { state: SwitchState }
export function SwitchContent(props: SwitchContentProps) {
  const [local, rest] = splitProps(props, ['class', 'state'])
  return (
    <span
      {...rest}
      aria-hidden="true"
      data-slot="switch-content"
      data-state={local.state}
      class={cn(switchContentClassName, local.class)}
    />
  )
}
