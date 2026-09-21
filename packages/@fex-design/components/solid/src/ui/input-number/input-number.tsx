import type { InputNumberPart } from '@fex-design/core/input-number/types'
import { cn } from '@fex-design/utils'
import { splitProps, type JSX, type ParentProps } from 'solid-js'
import { InputPrefix, InputSuffix } from '@fex-design/solid/primitive/input/input'
import {
  InputNumberActions,
  InputNumberClear,
  InputNumberControl,
  InputNumberDecrement,
  InputNumberIncrement,
  InputNumberRoot,
  type InputNumberRootProps,
} from '@fex-design/solid/primitive/input-number/input-number'
export interface InputNumberProps
  extends
    Omit<
      JSX.InputHTMLAttributes<HTMLInputElement>,
      'value' | 'onChange' | 'min' | 'max' | 'step' | 'prefix'
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
  prefix?: JSX.Element
  suffix?: JSX.Element
  incrementIcon?: JSX.Element
  decrementIcon?: JSX.Element
  classNames?: Partial<Record<InputNumberPart, string>>
  styles?: Partial<Record<InputNumberPart, JSX.CSSProperties>>
}
export function InputNumber(props: ParentProps<InputNumberProps>) {
  const controlled = Object.prototype.hasOwnProperty.call(props, 'value')
  const [local, root, control] = splitProps(
    props,
    [
      'clearable',
      'controls',
      'prefix',
      'suffix',
      'incrementIcon',
      'decrementIcon',
      'classNames',
      'styles',
      'class',
      'style',
    ],
    [
      'value',
      'defaultValue',
      'min',
      'max',
      'step',
      'precision',
      'parser',
      'formatter',
      'keyboard',
      'disabled',
      'readOnly',
      'size',
      'variant',
      'onChange',
    ],
  )
  return (
    <InputNumberRoot
      {...root}
      controlled={controlled}
      class={cn(local.classNames?.root, local.class)}
      style={{ ...local.styles?.root, ...(typeof local.style === 'object' ? local.style : {}) }}
      content={() => (
        <>
          {local.prefix != null && (
            <InputPrefix class={local.classNames?.prefix} style={local.styles?.prefix}>
              {local.prefix}
            </InputPrefix>
          )}
          <InputNumberControl
            {...control}
            class={local.classNames?.control}
            style={local.styles?.control}
          />
          {local.clearable && (
            <InputNumberClear class={local.classNames?.clear} style={local.styles?.clear} />
          )}
          {local.suffix != null && (
            <InputSuffix class={local.classNames?.suffix} style={local.styles?.suffix}>
              {local.suffix}
            </InputSuffix>
          )}
          {local.controls !== false && (
            <InputNumberActions class={local.classNames?.actions} style={local.styles?.actions}>
              <InputNumberIncrement
                class={local.classNames?.increment}
                style={local.styles?.increment}
              >
                {local.incrementIcon}
              </InputNumberIncrement>
              <InputNumberDecrement
                class={local.classNames?.decrement}
                style={local.styles?.decrement}
              >
                {local.decrementIcon}
              </InputNumberDecrement>
            </InputNumberActions>
          )}
        </>
      )}
    />
  )
}
