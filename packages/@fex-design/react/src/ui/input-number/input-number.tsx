import type { InputNumberPart } from '@fex-design/core/input-number/types'
import { cn } from '@fex/utils'
import type { ComponentProps, CSSProperties, ReactNode } from 'react'
import { InputPrefix, InputSuffix } from '../../primitive/input/input'
import {
  InputNumberActions,
  InputNumberClear,
  InputNumberControl,
  InputNumberDecrement,
  InputNumberIncrement,
  InputNumberRoot,
  type InputNumberRootProps,
} from '../../primitive/input-number/input-number'

export interface InputNumberProps
  extends
    Omit<
      ComponentProps<'input'>,
      'value' | 'defaultValue' | 'type' | 'onChange' | 'prefix' | 'size' | 'min' | 'max' | 'step'
    >,
    Pick<
      InputNumberRootProps,
      | 'value'
      | 'defaultValue'
      | 'min'
      | 'max'
      | 'step'
      | 'precision'
      | 'parser'
      | 'formatter'
      | 'keyboard'
      | 'size'
      | 'variant'
      | 'onChange'
    > {
  clearable?: boolean
  controls?: boolean
  prefix?: ReactNode
  suffix?: ReactNode
  incrementIcon?: ReactNode
  decrementIcon?: ReactNode
  classNames?: Partial<Record<InputNumberPart, string>>
  styles?: Partial<Record<InputNumberPart, CSSProperties>>
}

export function InputNumber(inputNumberProps: InputNumberProps) {
  const controlled = Object.prototype.hasOwnProperty.call(inputNumberProps, 'value')
  const {
    clearable = false,
    controls = true,
    prefix,
    suffix,
    incrementIcon,
    decrementIcon,
    className,
    style,
    classNames,
    styles,
    value,
    defaultValue,
    min,
    max,
    step,
    precision,
    parser,
    formatter,
    keyboard,
    size,
    variant,
    onChange,
    disabled,
    readOnly,
    ...controlProps
  } = inputNumberProps
  return (
    <InputNumberRoot
      controlled={controlled}
      value={value}
      defaultValue={defaultValue}
      min={min}
      max={max}
      step={step}
      precision={precision}
      parser={parser}
      formatter={formatter}
      keyboard={keyboard}
      size={size}
      variant={variant}
      onChange={onChange}
      disabled={disabled}
      readOnly={readOnly}
      className={cn(classNames?.root, className)}
      style={{ ...styles?.root, ...style }}
    >
      {prefix != null && (
        <InputPrefix className={classNames?.prefix} style={styles?.prefix}>
          {prefix}
        </InputPrefix>
      )}
      <InputNumberControl
        {...controlProps}
        disabled={disabled}
        readOnly={readOnly}
        className={classNames?.control}
        style={styles?.control}
      />
      {clearable && <InputNumberClear className={classNames?.clear} style={styles?.clear} />}
      {suffix != null && (
        <InputSuffix className={classNames?.suffix} style={styles?.suffix}>
          {suffix}
        </InputSuffix>
      )}
      {controls && (
        <InputNumberActions className={classNames?.actions} style={styles?.actions}>
          <InputNumberIncrement className={classNames?.increment} style={styles?.increment}>
            {incrementIcon}
          </InputNumberIncrement>
          <InputNumberDecrement className={classNames?.decrement} style={styles?.decrement}>
            {decrementIcon}
          </InputNumberDecrement>
        </InputNumberActions>
      )}
    </InputNumberRoot>
  )
}

export type { InputNumberPart } from '@fex-design/core/input-number/types'
