import { buttonIconClassName } from '@fex-design/styles/button'
import { cn } from '@fex/utils'
import type { ButtonIconProps } from './button.types'

export function ButtonIcon({
  className,
  placement = 'start',
  'data-icon': dataIcon,
  ref,
  ...props
}: ButtonIconProps) {
  return (
    <span
      {...props}
      ref={ref}
      className={cn(buttonIconClassName(), className)}
      data-icon={dataIcon ?? (placement === 'end' ? 'inline-end' : 'inline-start')}
    />
  )
}
