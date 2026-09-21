import { kbdClassName, kbdGroupClassName } from '@fex-design/components-styles/kbd'
import { cn } from '@fex-design/utils'
import type { ComponentProps } from 'react'

export function Kbd({ className, ...props }: ComponentProps<'kbd'>) {
  return <kbd data-slot="kbd" className={cn(kbdClassName, className)} {...props} />
}

export function KbdGroup({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="kbd-group" className={cn(kbdGroupClassName, className)} {...props} />
}
