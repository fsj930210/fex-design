import { cn } from '@/lib/utils'
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
      className={cn("inline-flex shrink-0 items-center justify-center empty:hidden group-data-[effect=expand-icon]/button:w-0 group-data-[effect=expand-icon]/button:overflow-hidden group-data-[effect=expand-icon]/button:opacity-0 group-data-[effect=expand-icon]/button:transition-all group-data-[effect=expand-icon]/button:duration-200 group-data-[effect=expand-icon]/button:group-hover/button:w-[calc(var(--button-icon-size)+var(--button-content-gap))] group-data-[effect=expand-icon]/button:group-hover/button:opacity-100 group-data-[effect=expand-icon]/button:group-focus-visible/button:w-[calc(var(--button-icon-size)+var(--button-content-gap))] group-data-[effect=expand-icon]/button:group-focus-visible/button:opacity-100 group-data-[effect=expand-icon]/button:motion-reduce:transition-none", className)}
      data-icon={dataIcon ?? (placement === 'end' ? 'inline-end' : 'inline-start')}
    />
  )
}
