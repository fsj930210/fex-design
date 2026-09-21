import type { SwitchState } from '@fex-design/core/switch/types'
import { switchContentClassName } from '@fex-design/components-styles/switch'
import { cn } from '@fex-design/utils'
import type { ComponentProps } from 'react'
export type SwitchContentProps = ComponentProps<'span'> & { state: SwitchState }
export function SwitchContent({ state, className, ...props }: SwitchContentProps) {
  return (
    <span
      {...props}
      aria-hidden="true"
      data-slot="switch-content"
      data-state={state}
      className={cn(switchContentClassName, className)}
    />
  )
}
