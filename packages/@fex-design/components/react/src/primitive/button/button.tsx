import { buttonClassName } from '@fex-design/components-styles/button'
import { cn } from '@fex-design/utils'
import type { ButtonProps } from './button.types'

export function Button({
  className,
  variant = 'outlined',
  color,
  ref,
  type = 'button',
  'data-slot': dataSlot = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      ref={ref}
      type={type}
      className={cn(buttonClassName({ variant, color }), className)}
      data-variant={variant}
      data-color={color}
      data-slot={dataSlot}
    />
  )
}
