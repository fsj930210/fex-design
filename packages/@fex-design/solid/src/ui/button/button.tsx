import { buttonClassName, buttonSpinnerClassName } from '@fex-design/styles/button'
import { cn } from '@fex/utils'
import { Show, splitProps } from 'solid-js'
import { LoadingIcon } from '../../icon/loading'
import { Button as PrimitiveButton } from '../../primitive/button/button'
import { ButtonIcon } from '../../primitive/button/button-icon'
import type { ButtonProps } from './button.types'

export type { ButtonProps } from './button.types'

export function Button(props: ButtonProps) {
  const [local, rest] = splitProps(props, [
    'class',
    'variant',
    'size',
    'effect',
    'icon',
    'loadingIndicator',
    'iconPlacement',
    'loading',
    'disabled',
    'children',
    'type',
  ])

  const variant = () => local.variant ?? 'default'
  const size = () => local.size ?? 'default'
  const iconPlacement = () => local.iconPlacement ?? 'start'
  const isLoading = () => local.loading === true
  const isDisabled = () => local.disabled === true || isLoading()
  const iconNode = () =>
    isLoading()
      ? (local.loadingIndicator ?? <LoadingIcon class={buttonSpinnerClassName} />)
      : local.icon

  return (
    <PrimitiveButton
      {...rest}
      type={local.type ?? 'button'}
      class={cn(
        buttonClassName({ variant: variant(), size: size(), effect: local.effect }),
        local.class,
      )}
      data-slot="button"
      data-variant={variant()}
      data-size={size()}
      data-effect={local.effect}
      data-loading={isLoading() ? 'true' : undefined}
      disabled={isDisabled()}
    >
      <Show when={iconPlacement() === 'start' && iconNode()}>
        <ButtonIcon placement="start" effect={local.effect}>
          {iconNode()}
        </ButtonIcon>
      </Show>
      {local.children}
      <Show when={iconPlacement() === 'end' && iconNode()}>
        <ButtonIcon placement="end" effect={local.effect}>
          {iconNode()}
        </ButtonIcon>
      </Show>
    </PrimitiveButton>
  )
}

export { ButtonGroup } from '../../primitive/button/button-group'
export type { ButtonGroupProps } from '../../primitive/button/button.types'
