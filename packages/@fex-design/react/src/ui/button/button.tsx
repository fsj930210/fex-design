import { buttonClassName, buttonSpinnerClassName } from '@fex-design/styles/button'
import { cn } from '@fex/utils'
import { Button as PrimitiveButton } from '../../primitive/button/button'
import { ButtonIcon } from '../../primitive/button/button-icon'
import { LoadingIcon } from '../../icon/loading'
import type { ButtonProps } from './button.types'

export type { ButtonProps } from './button.types'

export function Button({
  className,
  variant = 'default',
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
      className={cn(buttonClassName({ variant, size, effect }), className)}
      data-slot="button"
      data-variant={variant}
      data-size={size}
      data-effect={effect}
      data-loading={loading ? 'true' : undefined}
      disabled={isDisabled}
    >
      {iconPlacement === 'start' && iconNode ? (
        <ButtonIcon placement="start" effect={effect}>
          {iconNode}
        </ButtonIcon>
      ) : null}
      {children}
      {iconPlacement === 'end' && iconNode ? (
        <ButtonIcon placement="end" effect={effect}>
          {iconNode}
        </ButtonIcon>
      ) : null}
    </PrimitiveButton>
  )
}

export { ButtonGroup } from '../../primitive/button/button-group'
export type { ButtonGroupProps } from '../../primitive/button/button.types'
