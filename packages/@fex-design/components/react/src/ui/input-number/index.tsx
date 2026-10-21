import type { InputNumberPart } from '@fex-design/core/input-number/types'
import { cn } from '@fex-design/utils'
import { useLazyRef } from '@fex-design/react/hooks/use-lazy-ref'
import type { ComponentProps, CSSProperties, ReactNode } from 'react'
import { InputPrefix, InputSuffix } from '@fex-design/react/primitive/input'
import {
  InputNumberActions,
  InputNumberClear,
  InputNumberControl,
  InputNumberDecrement,
  InputNumberIncrement,
  InputNumberRoot,
  type InputNumberRootProps,
} from '@fex-design/react/primitive/input-number'

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
  controlProps?: Omit<ComponentProps<typeof InputNumberControl>, 'children'> | undefined
  actionsProps?: Omit<ComponentProps<typeof InputNumberActions>, 'children'> | undefined
  incrementProps?: Omit<ComponentProps<typeof InputNumberIncrement>, 'children'> | undefined
  decrementProps?: Omit<ComponentProps<typeof InputNumberDecrement>, 'children'> | undefined
  clearProps?: Omit<ComponentProps<typeof InputNumberClear>, 'children'> | undefined
  prefixProps?: Omit<ComponentProps<typeof InputPrefix>, 'children'> | undefined
  suffixProps?: Omit<ComponentProps<typeof InputSuffix>, 'children'> | undefined
  prefix?: ReactNode
  suffix?: ReactNode
  incrementIcon?: ReactNode
  decrementIcon?: ReactNode
  classNames?: Partial<Record<InputNumberPart, string>>
  styles?: Partial<Record<InputNumberPart, CSSProperties>>
}

export function InputNumber(inputNumberProps: InputNumberProps) {
  const controlled = useLazyRef(() =>
    Object.prototype.hasOwnProperty.call(inputNumberProps, 'value'),
  ).current
  const {
    clearable = false,
    controls = true,
    controlProps,
    actionsProps,
    incrementProps,
    decrementProps,
    clearProps,
    prefixProps,
    suffixProps,
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
    'data-warning': dataWarning,
    ...controlAttributes
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
      data-warning={dataWarning}
      className={cn(classNames?.root, className)}
      style={{ ...styles?.root, ...style }}
    >
      {prefix != null && (
        <InputPrefix
          {...prefixProps}
          className={cn(classNames?.prefix, prefixProps?.className)}
          style={{ ...styles?.prefix, ...prefixProps?.style }}
        >
          {prefix}
        </InputPrefix>
      )}
      <InputNumberControl
        {...controlProps}
        {...controlAttributes}
        disabled={disabled}
        readOnly={readOnly}
        className={cn(classNames?.control, controlProps?.className)}
        style={{ ...styles?.control, ...controlProps?.style }}
      />
      {clearable && (
        <InputNumberClear
          {...clearProps}
          className={cn(classNames?.clear, clearProps?.className)}
          style={{ ...styles?.clear, ...clearProps?.style }}
        />
      )}
      {suffix != null && (
        <InputSuffix
          {...suffixProps}
          className={cn(classNames?.suffix, suffixProps?.className)}
          style={{ ...styles?.suffix, ...suffixProps?.style }}
        >
          {suffix}
        </InputSuffix>
      )}
      {controls && (
        <InputNumberActions
          {...actionsProps}
          className={cn(classNames?.actions, actionsProps?.className)}
          style={{ ...styles?.actions, ...actionsProps?.style }}
        >
          <InputNumberIncrement
            {...incrementProps}
            className={cn(classNames?.increment, incrementProps?.className)}
            style={{ ...styles?.increment, ...incrementProps?.style }}
          >
            {incrementIcon}
          </InputNumberIncrement>
          <InputNumberDecrement
            {...decrementProps}
            className={cn(classNames?.decrement, decrementProps?.className)}
            style={{ ...styles?.decrement, ...decrementProps?.style }}
          >
            {decrementIcon}
          </InputNumberDecrement>
        </InputNumberActions>
      )}
    </InputNumberRoot>
  )
}

export type { InputNumberPart } from '@fex-design/core/input-number/types'
