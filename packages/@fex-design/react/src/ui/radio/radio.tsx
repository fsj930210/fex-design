import { radioItemClassName, radioLabelClassName } from '@fex-design/styles/radio'
import { cn } from '@fex/utils'
import { useId, type ComponentProps, type CSSProperties, type ReactNode } from 'react'
import {
  Radio as PrimitiveRadio,
  RadioButton as PrimitiveRadioButton,
  RadioGroup as PrimitiveRadioGroup,
  type RadioValue,
} from '../../primitive/radio/radio'

export interface RadioClassNames {
  root?: string
  control?: string
  label?: string
}
export interface RadioStyles {
  root?: CSSProperties
  control?: CSSProperties
  label?: CSSProperties
}
export interface RadioProps extends Omit<ComponentProps<typeof PrimitiveRadio>, 'children'> {
  children?: ReactNode
  classNames?: RadioClassNames
  styles?: RadioStyles
}
export function Radio({ children, className, style, classNames, styles, id, ...props }: RadioProps) {
  const controlId = id ?? useId()
  return (
    <div
      className={cn(radioItemClassName, className, classNames?.root)}
      style={{ ...style, ...styles?.root }}
    >
      <PrimitiveRadio {...props} id={controlId} className={classNames?.control} style={styles?.control} />
      {children !== undefined && (
        <label htmlFor={controlId} className={cn(radioLabelClassName, classNames?.label)} style={styles?.label}>
          {children}
        </label>
      )}
    </div>
  )
}

export type RadioButtonProps = ComponentProps<typeof PrimitiveRadioButton>
export function RadioButton(props: RadioButtonProps) {
  return <PrimitiveRadioButton {...props} />
}

export interface RadioOption<T extends RadioValue = RadioValue> {
  label: ReactNode
  value: T
  disabled?: boolean
}
export interface RadioGroupProps extends ComponentProps<typeof PrimitiveRadioGroup> {
  options?: readonly RadioOption[]
}
export function RadioGroup({ options, children, ...props }: RadioGroupProps) {
  return (
    <PrimitiveRadioGroup {...props}>
      {options?.map((option) => (
        <Radio key={String(option.value)} value={option.value} disabled={option.disabled}>
          {option.label}
        </Radio>
      )) ?? children}
    </PrimitiveRadioGroup>
  )
}
export interface RadioButtonGroupProps extends ComponentProps<typeof PrimitiveRadioGroup> {
  options?: readonly RadioOption[]
}
export function RadioButtonGroup({ options, children, className, orientation = 'horizontal', ...props }: RadioButtonGroupProps) {
  return (
    <PrimitiveRadioGroup {...props} orientation={orientation} className={cn('gap-0', className)}>
      {options?.map((option) => (
        <RadioButton key={String(option.value)} value={option.value} disabled={option.disabled}>
          {option.label}
        </RadioButton>
      )) ?? children}
    </PrimitiveRadioGroup>
  )
}

export type { RadioValue }
