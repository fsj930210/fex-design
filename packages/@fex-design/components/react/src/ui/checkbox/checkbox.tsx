import type { CheckboxValue } from '@fex-design/core/checkbox/types'
import type { ComponentProps, CSSProperties, ReactNode } from 'react'
import { cn } from '@fex-design/utils'
import {
  CheckboxControl,
  CheckboxGroup as PrimitiveCheckboxGroup,
  CheckboxIndicator,
  CheckboxLabel,
  CheckboxRoot,
} from '@fex-design/react/primitive/checkbox/checkbox'
export interface CheckboxClassNames {
  root?: string
  control?: string
  indicator?: string
  label?: string
}
export interface CheckboxStyles {
  root?: CSSProperties
  control?: CSSProperties
  indicator?: CSSProperties
  label?: CSSProperties
}
export interface CheckboxProps extends Omit<
  ComponentProps<typeof CheckboxControl>,
  'children' | 'size'
> {
  children?: ReactNode
  indicator?: ReactNode
  size?: ComponentProps<typeof CheckboxRoot>['size']
  className?: string
  style?: CSSProperties
  classNames?: CheckboxClassNames
  styles?: CheckboxStyles
}
export function Checkbox({
  children,
  indicator,
  size,
  className,
  style,
  classNames,
  styles,
  ...props
}: CheckboxProps) {
  return (
    <CheckboxRoot
      size={size}
      className={cn(className, classNames?.root)}
      style={{ ...style, ...styles?.root }}
      value={props.value}
      disabled={props.disabled}
    >
      <CheckboxControl {...props} className={classNames?.control} style={styles?.control} />
      <CheckboxIndicator className={classNames?.indicator} style={styles?.indicator}>
        {indicator}
      </CheckboxIndicator>
      {children !== undefined && (
        <CheckboxLabel className={classNames?.label} style={styles?.label}>
          {children}
        </CheckboxLabel>
      )}
    </CheckboxRoot>
  )
}
export interface CheckboxOption<T extends CheckboxValue = CheckboxValue> {
  label: ReactNode
  value: T
  disabled?: boolean
}
export interface CheckboxGroupProps extends ComponentProps<typeof PrimitiveCheckboxGroup> {
  options?: readonly CheckboxOption[]
}
export function CheckboxGroup({ options, children, ...props }: CheckboxGroupProps) {
  return (
    <PrimitiveCheckboxGroup {...props}>
      {options?.map((option) => (
        <Checkbox key={String(option.value)} value={option.value} disabled={option.disabled}>
          {option.label}
        </Checkbox>
      )) ?? children}
    </PrimitiveCheckboxGroup>
  )
}
