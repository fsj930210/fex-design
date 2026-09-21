import { buttonClassName, buttonSpinnerClassName } from '@fex-design/components-styles/button'
import { cn } from '@fex-design/utils'
import { Show, splitProps } from 'solid-js'
import { LoadingIcon } from '@fex-design/solid/icons/loading'
import { Button as PrimitiveButton } from '@fex-design/solid/primitive/button/button'
import { ButtonIcon } from '@fex-design/solid/primitive/button/button-icon'
import type { ButtonProps } from './button.types'

export type { ButtonProps } from './button.types'

export function Button(props: ButtonProps) {
  const [local, rest] = splitProps(props, [
    'class',
    'variant',
    'color',
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

  const variant = () => local.variant ?? 'outlined'
  const color = () => local.color
  const size = () => local.size ?? 'md'
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
        buttonClassName({ variant: variant(), color: color(), size: size(), effect: local.effect }),
        local.class,
      )}
      data-slot="button"
      data-variant={variant()}
      data-color={color()}
      variant={variant()}
      color={color()}
      data-size={size()}
      data-effect={local.effect}
      data-loading={isLoading() ? 'true' : undefined}
      disabled={isDisabled()}
    >
      <Show when={iconPlacement() === 'start' && iconNode()}>
        <ButtonIcon data-icon="inline-start">{iconNode()}</ButtonIcon>
      </Show>
      {local.children}
      <Show when={iconPlacement() === 'end' && iconNode()}>
        <ButtonIcon data-icon="inline-end">{iconNode()}</ButtonIcon>
      </Show>
    </PrimitiveButton>
  )
}

export { ButtonGroup } from '@fex-design/solid/primitive/button/button-group'
export type { ButtonGroupProps } from '@fex-design/solid/primitive/button/button.types'
