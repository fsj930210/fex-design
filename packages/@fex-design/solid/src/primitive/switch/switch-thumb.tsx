import { switchThumbClassName } from '@fex-design/styles/switch'
import { cn } from '@fex/utils'
import { splitProps, type JSX } from 'solid-js'
export type SwitchThumbProps = JSX.HTMLAttributes<HTMLSpanElement>
export function SwitchThumb(props: SwitchThumbProps) {
  const [local, rest] = splitProps(props, ['class'])
  return <span {...rest} aria-hidden="true" data-slot="switch-thumb"  class={cn(switchThumbClassName, local.class)} />
}
