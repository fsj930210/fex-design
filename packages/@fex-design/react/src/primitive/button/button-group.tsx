import { buttonGroupClassName } from '@fex-design/styles/button'
import { cn } from '@fex/utils'
import type { CSSProperties } from 'react'
import type { ButtonGroupProps } from './button.types'

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
