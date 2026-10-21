import { mergeStyle } from '@fex-design/solid/primitives/merge-style'
import type { InputNumberPart } from '@fex-design/core/input-number/types'
import { cn } from '@fex-design/utils'
import { splitProps, type ComponentProps, type JSX, type ParentProps } from 'solid-js'
import { InputPrefix, InputSuffix } from '@fex-design/solid/primitive/input'
import {
  InputNumberActions,
  InputNumberClear,
  InputNumberControl,
  InputNumberDecrement,
  InputNumberIncrement,
  InputNumberRoot,
  type InputNumberRootProps,
} from '@fex-design/solid/primitive/input-number'
export interface InputNumberProps
  extends
    Omit<
      JSX.InputHTMLAttributes<HTMLInputElement>,
      'value' | 'defaultValue' | 'type' | 'size' | 'onChange' | 'min' | 'max' | 'step' | 'prefix'
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
  clearable?: boolean | undefined
  controls?: boolean | undefined
  controlProps?: Omit<ComponentProps<typeof InputNumberControl>, 'children'> | undefined
  actionsProps?: Omit<ComponentProps<typeof InputNumberActions>, 'children'> | undefined
  incrementProps?: Omit<ComponentProps<typeof InputNumberIncrement>, 'children'> | undefined
  decrementProps?: Omit<ComponentProps<typeof InputNumberDecrement>, 'children'> | undefined
  clearProps?: Omit<ComponentProps<typeof InputNumberClear>, 'children'> | undefined
  prefixProps?: Omit<ComponentProps<typeof InputPrefix>, 'children'> | undefined
  suffixProps?: Omit<ComponentProps<typeof InputSuffix>, 'children'> | undefined
  prefix?: JSX.Element | undefined
  suffix?: JSX.Element | undefined
  incrementIcon?: JSX.Element | undefined
  decrementIcon?: JSX.Element | undefined
  classNames?: Partial<Record<InputNumberPart, string>> | undefined
  styles?: Partial<Record<InputNumberPart, JSX.CSSProperties>> | undefined
  'data-warning'?: string | undefined
}
export function InputNumber(props: ParentProps<InputNumberProps>) {
  const controlled = Object.prototype.hasOwnProperty.call(props, 'value')
  const [local, root, control] = splitProps(
    props,
    [
      'clearable',
      'controls',
      'controlProps',
      'actionsProps',
      'incrementProps',
      'decrementProps',
      'clearProps',
      'prefixProps',
      'suffixProps',
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
      'data-warning',
    ],
  )
  return (
    <InputNumberRoot
      {...root}
      controlled={controlled}
      class={cn(local.classNames?.root, local.class)}
      style={mergeStyle(local.styles?.root, local.style)}
      content={() => (
        <>
          {local.prefix != null && (
            <InputPrefix
              {...local.prefixProps}
              class={cn(local.classNames?.prefix, local.prefixProps?.class)}
              style={mergeStyle(local.styles?.prefix, local.prefixProps?.style)}
            >
              {local.prefix}
            </InputPrefix>
          )}
          <InputNumberControl
            {...local.controlProps}
            {...control}
            class={cn(local.classNames?.control, local.controlProps?.class)}
            style={mergeStyle(local.styles?.control, local.controlProps?.style)}
          />
          {local.clearable && (
            <InputNumberClear
              {...local.clearProps}
              class={cn(local.classNames?.clear, local.clearProps?.class)}
              style={mergeStyle(local.styles?.clear, local.clearProps?.style)}
            />
          )}
          {local.suffix != null && (
            <InputSuffix
              {...local.suffixProps}
              class={cn(local.classNames?.suffix, local.suffixProps?.class)}
              style={mergeStyle(local.styles?.suffix, local.suffixProps?.style)}
            >
              {local.suffix}
            </InputSuffix>
          )}
          {local.controls !== false && (
            <InputNumberActions
              {...local.actionsProps}
              class={cn(local.classNames?.actions, local.actionsProps?.class)}
              style={mergeStyle(local.styles?.actions, local.actionsProps?.style)}
            >
              <InputNumberIncrement
                {...local.incrementProps}
                class={cn(local.classNames?.increment, local.incrementProps?.class)}
                style={mergeStyle(local.styles?.increment, local.incrementProps?.style)}
              >
                {local.incrementIcon}
              </InputNumberIncrement>
              <InputNumberDecrement
                {...local.decrementProps}
                class={cn(local.classNames?.decrement, local.decrementProps?.class)}
                style={mergeStyle(local.styles?.decrement, local.decrementProps?.style)}
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
