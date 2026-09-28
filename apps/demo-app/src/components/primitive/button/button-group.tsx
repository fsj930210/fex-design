import { cn } from '@/lib/utils'
import type { CSSProperties } from 'react'
import type { ButtonGroupProps } from './button.types'
import { cva } from 'class-variance-authority'

const buttonGroupClassName = cva('inline-flex w-fit items-stretch', {
  variants: {
    orientation: {
      horizontal: 'flex-row',
      vertical: 'flex-col',
    },
    connected: {
      true: "[&>[data-slot=button]]:rounded-none data-[orientation=horizontal]:[&>[data-slot=button]:first-child]:rounded-s-md data-[orientation=horizontal]:[&>[data-slot=button]:last-child]:rounded-e-md data-[orientation=vertical]:[&>[data-slot=button]:first-child]:rounded-t-md data-[orientation=vertical]:[&>[data-slot=button]:last-child]:rounded-b-md data-[orientation=horizontal]:[&>[data-slot=button]+[data-slot=button]]:-ms-px data-[orientation=vertical]:[&>[data-slot=button]+[data-slot=button]]:-mt-px",
      false: '',
    },
  },
  defaultVariants: { orientation: 'horizontal', connected: true },
})

export function ButtonGroup({
  orientation = 'horizontal',
  spacing = 0,
  className,
  style,
  ...props
}: ButtonGroupProps) {
  const groupStyle: CSSProperties = {
    ...style,
    gap: typeof spacing === 'number' ? `${spacing}px` : spacing,
  }

  return (
    <div
      {...props}
      role="group"
      data-slot="button-group"
      data-orientation={orientation}
      className={cn(buttonGroupClassName({ orientation, connected: spacing === 0 }), className)}
      style={groupStyle}
    />
  )
}
