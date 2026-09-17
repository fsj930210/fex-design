import type { InputNumberFormatter, InputNumberParser } from '@fex-design/core/input-number/types'
import { splitProps, type JSX, type ParentProps } from 'solid-js'
import { InputRoot } from '../input/input'
import { InputNumberContext } from './input-number-context'
import { useInputNumber } from './use-input-number'
export interface InputNumberRootProps extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  controlled?: boolean
  content?: () => JSX.Element
  value?: number
  defaultValue?: number
  min?: number
  max?: number
  step?: number
  precision?: number
  parser?: InputNumberParser
  formatter?: InputNumberFormatter
  disabled?: boolean
  readOnly?: boolean
  keyboard?: boolean
  size?: 'sm' | 'md' | 'lg'
  variant?: 'outlined' | 'filled' | 'borderless' | 'underlined'
  onChange?: (event: Event, value: number | undefined) => void
}
export function InputNumberRoot(props: ParentProps<InputNumberRootProps>) {
  const hasValue = Object.prototype.hasOwnProperty.call(props, 'value')
  const [local, rest] = splitProps(props, [
    'controlled',
    'content',
    'value',
    'defaultValue',
    'min',
    'max',
    'step',
    'precision',
    'parser',
    'formatter',
    'disabled',
    'readOnly',
    'keyboard',
    'size',
    'variant',
    'onChange',
  ])
  const inputNumber = useInputNumber(() => ({ ...local, controlled: local.controlled ?? hasValue }))
  const Content = () => {
    const [, inputRootProps] = splitProps(rest, ['children'])
    return (
      <InputRoot
        {...inputRootProps}
        value={inputNumber.draft()}
        disabled={local.disabled}
        readOnly={local.readOnly}
        size={local.size}
        variant={local.variant}
        data-slot="input-number-root"
        data-out-of-range={inputNumber.outOfRange() || undefined}
        onValueChange={(text, meta) => {
          if (meta.reason === 'input') inputNumber.input(text, meta.event)
        }}
      >
        {local.content ? local.content() : props.children}
      </InputRoot>
    )
  }
  return (
    <InputNumberContext.Provider value={inputNumber}>
      <Content />
    </InputNumberContext.Provider>
  )
}
