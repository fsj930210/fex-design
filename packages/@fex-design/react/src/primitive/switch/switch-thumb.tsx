import { switchThumbClassName } from '@fex-design/styles/switch'
import { cn } from '@fex/utils'
import type { ComponentProps } from 'react'
export type SwitchThumbProps = ComponentProps<'span'>
export function SwitchThumb({ className, ...props }: SwitchThumbProps) {
  return <span {...props} aria-hidden="true" data-slot="switch-thumb"  className={cn(switchThumbClassName, className)} />
}
