import { buttonClassName, buttonSpinnerClassName } from '@fex-design/styles/button'
import { cn } from '@fex/utils'
import { Button as PrimitiveButton } from '../../primitive/button/button'
import { ButtonIcon } from '../../primitive/button/button-icon'
import { LoadingIcon } from '../../icon/loading'
import type { ButtonProps } from './button.types'

export type { ButtonProps } from './button.types'

export function Button({
  className,
  variant = 'outlined',
  color,
  size = 'default',
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
        <ButtonIcon data-icon="inline-start">
          {iconNode}
        </ButtonIcon>
      ) : null}
      {children}
      {iconPlacement === 'end' && iconNode ? (
        <ButtonIcon data-icon="inline-end">
          {iconNode}
        </ButtonIcon>
      ) : null}
    </PrimitiveButton>
  )
}

export { ButtonGroup } from '../../primitive/button/button-group'
export type { ButtonGroupProps } from '../../primitive/button/button.types'
