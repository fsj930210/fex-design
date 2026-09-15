import { radioItemClassName, radioLabelClassName } from '@fex-design/styles/radio'
import { cn } from '@fex/utils'
import { createUniqueId, For, splitProps, type JSX, type ParentProps } from 'solid-js'
import {
  Radio as PrimitiveRadio,
  RadioButton as PrimitiveRadioButton,
  RadioGroup as PrimitiveRadioGroup,
  type RadioGroupProps as PrimitiveGroupProps,
  type RadioProps as PrimitiveRadioProps,
  type RadioValue,
} from '../../primitive/radio/radio'

export interface RadioProps extends ParentProps<PrimitiveRadioProps> {
  classNames?: { root?: string; control?: string; label?: string }
  styles?: { root?: JSX.CSSProperties; control?: JSX.CSSProperties; label?: JSX.CSSProperties }
}
export function Radio(props: RadioProps) {
  const generatedId = createUniqueId()
  const [local, control] = splitProps(props, [
    'children',
    'class',
    'style',
    'classNames',
    'styles',
    'id',
  ])
  const controlId = () => local.id ?? generatedId
  return (
    <div
      class={cn(radioItemClassName, local.class, local.classNames?.root)}
      style={{ ...(local.style as JSX.CSSProperties), ...local.styles?.root }}
    >
      <PrimitiveRadio
        {...control}
        id={controlId()}
        class={local.classNames?.control}
        style={local.styles?.control}
      />
      {local.children !== undefined && (
        <label
          for={controlId()}
          class={cn(radioLabelClassName, local.classNames?.label)}
          style={local.styles?.label}
        >
          {local.children}
        </label>
      )}
    </div>
  )
}
export type RadioButtonProps = Parameters<typeof PrimitiveRadioButton>[0]
export function RadioButton(props: RadioButtonProps) {
  return <PrimitiveRadioButton {...props} />
}
export interface RadioOption {
  label: JSX.Element
  value: RadioValue
  disabled?: boolean
}
export interface RadioGroupProps extends PrimitiveGroupProps {
  options?: readonly RadioOption[]
}
export function RadioGroup(props: RadioGroupProps) {
  const [local, rest] = splitProps(props, ['options', 'children'])
  return (
    <PrimitiveRadioGroup {...rest}>
      {local.options ? (
        <For each={local.options}>
          {(option) => (
            <Radio value={option.value} disabled={option.disabled}>
              {option.label}
            </Radio>
          )}
        </For>
      ) : (
        local.children
      )}
    </PrimitiveRadioGroup>
  )
}
export interface RadioButtonGroupProps extends PrimitiveGroupProps {
  options?: readonly RadioOption[]
}
export function RadioButtonGroup(props: RadioButtonGroupProps) {
  const [local, rest] = splitProps(props, ['options', 'children', 'class'])
  return (
    <PrimitiveRadioGroup
      {...rest}
      orientation={rest.orientation ?? 'horizontal'}
      class={cn('gap-0', local.class)}
    >
      {local.options ? (
        <For each={local.options}>
          {(option) => (
            <RadioButton value={option.value} disabled={option.disabled}>
              {option.label}
            </RadioButton>
          )}
        </For>
      ) : (
        local.children
      )}
    </PrimitiveRadioGroup>
  )
}
export type { RadioValue }
