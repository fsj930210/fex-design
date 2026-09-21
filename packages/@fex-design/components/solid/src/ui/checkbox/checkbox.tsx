import type { CheckboxValue } from '@fex-design/core/checkbox/types'
import { checkboxCheckIconClassName, checkboxMinusIconClassName } from '@fex-design/components-styles/checkbox'
import { cn } from '@fex-design/utils'
import { splitProps, type JSX, type ParentProps } from 'solid-js'
import {
  CheckboxControl,
  CheckboxGroup as PrimitiveCheckboxGroup,
  CheckboxIndicator,
  CheckboxLabel,
  CheckboxRoot,
  type CheckboxControlProps,
  type CheckboxGroupProps as PrimitiveGroupProps,
} from '@fex-design/solid/primitive/checkbox/checkbox'
import { CheckIcon } from '@fex-design/solid/icons/check'
import { MinusIcon } from '@fex-design/solid/icons/minus'
export interface CheckboxProps extends ParentProps<CheckboxControlProps> {
  size?: 'sm' | 'md' | 'lg'
  class?: string
  indicator?: JSX.Element
  classNames?: { root?: string; control?: string; indicator?: string; label?: string }
  styles?: {
    root?: JSX.CSSProperties
    control?: JSX.CSSProperties
    indicator?: JSX.CSSProperties
    label?: JSX.CSSProperties
  }
}
export function Checkbox(props: CheckboxProps) {
  const [local, rest] = splitProps(props, [
    'children',
    'size',
    'class',
    'indicator',
    'classNames',
    'styles',
    'value',
    'disabled',
  ])
  return (
    <CheckboxRoot
      size={local.size}
      class={cn(local.class, local.classNames?.root)}
      style={local.styles?.root}
      value={local.value}
      disabled={local.disabled}
    >
      <CheckboxControl
        {...rest}
        value={local.value}
        disabled={local.disabled}
        class={local.classNames?.control}
        style={local.styles?.control}
      />
      <CheckboxIndicator class={local.classNames?.indicator} style={local.styles?.indicator}>
        {local.indicator ?? (
          <>
            <CheckIcon data-slot="checkbox-check" class={checkboxCheckIconClassName} />
            <MinusIcon data-slot="checkbox-minus" class={checkboxMinusIconClassName} />
          </>
        )}
      </CheckboxIndicator>
      {local.children !== undefined && (
        <CheckboxLabel class={local.classNames?.label} style={local.styles?.label}>
          {local.children}
        </CheckboxLabel>
      )}
    </CheckboxRoot>
  )
}
export interface CheckboxOption {
  label: JSX.Element
  value: CheckboxValue
  disabled?: boolean
}
export interface CheckboxGroupProps extends PrimitiveGroupProps {
  options?: readonly CheckboxOption[]
}
export function CheckboxGroup(props: CheckboxGroupProps) {
  const [local, rest] = splitProps(props, ['options', 'children'])
  return (
    <PrimitiveCheckboxGroup {...rest}>
      {local.options?.map((option) => (
        <Checkbox value={option.value} disabled={option.disabled}>
          {option.label}
        </Checkbox>
      )) ?? local.children}
    </PrimitiveCheckboxGroup>
  )
}
