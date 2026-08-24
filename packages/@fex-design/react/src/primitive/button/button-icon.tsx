import { buttonIconClassName } from '@fex-design/styles/button'
import { cn } from '@fex/utils'
import type { ButtonIconProps } from './button.types'

export function ButtonIcon({
  className,
  effect,
  placement = 'start',
  ref,
  'data-icon': dataIcon,
  ...props
}: ButtonIconProps) {
  return (
    <span
      {...props}
      ref={ref}
      className={cn(buttonIconClassName({ placement, effect }), className)}
      data-icon={dataIcon ?? `inline-${placement}`}
    />
  )
}
