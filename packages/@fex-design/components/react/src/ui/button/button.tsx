import { buttonClassName, buttonSpinnerClassName } from '@fex-design/components-styles/button'
import { cn } from '@fex-design/utils'
import { Button as PrimitiveButton } from '@fex-design/react/primitive/button/button'
import { ButtonIcon } from '@fex-design/react/primitive/button/button-icon'
import { LoadingIcon } from '@fex-design/react/icons/loading'
import type { ButtonProps } from './button.types'

export type { ButtonProps } from './button.types'

export function Button({
  className,
  variant = 'outlined',
  color,
  size = 'md',
  effect,
  icon,
  loadingIndicator,
  iconPlacement = 'start',
  loading = false,
  disabled,
  children,
  ref,
  type = 'button',
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading
  const iconNode = loading
    ? (loadingIndicator ?? <LoadingIcon className={buttonSpinnerClassName} />)
    : icon

  return (
    <PrimitiveButton
      {...props}
      {...(ref ? { ref } : {})}
      type={type}
      className={cn(buttonClassName({ variant, color, size, effect }), className)}
      variant={variant}
      color={color}
      data-slot="button"
      data-variant={variant}
      data-color={color}
      data-size={size}
      data-effect={effect}
      data-loading={loading ? 'true' : undefined}
      disabled={isDisabled}
    >
      {iconPlacement === 'start' && iconNode ? (
        <ButtonIcon data-icon="inline-start">{iconNode}</ButtonIcon>
      ) : null}
      {children}
      {iconPlacement === 'end' && iconNode ? (
        <ButtonIcon data-icon="inline-end">{iconNode}</ButtonIcon>
      ) : null}
    </PrimitiveButton>
  )
}

export { ButtonGroup } from '@fex-design/react/primitive/button/button-group'
export type { ButtonGroupProps } from '@fex-design/react/primitive/button/button.types'
