import { buttonPrimitiveClassName } from '@fex-design/styles/button'
import { cn } from '@fex/utils'
import type { ButtonProps } from './button.types'

export function Button({
  className,
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
      className={cn(buttonPrimitiveClassName, className)}
      data-slot={dataSlot}
    />
  )
}
