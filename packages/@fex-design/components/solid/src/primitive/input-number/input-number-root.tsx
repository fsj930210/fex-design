import type { InputNumberFormatter, InputNumberParser } from '@fex-design/core/input-number/types'
import { splitProps, type JSX, type ParentProps } from 'solid-js'
import { InputRoot } from '../input'
import { InputNumberContext } from './input-number-context'
import { useInputNumber } from './use-input-number'
import { inputNumberRootClassName } from '@fex-design/components-styles/input-number'
import { cn } from '@fex-design/utils'
export interface InputNumberRootProps extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  controlled?: boolean | undefined
  content?: (() => JSX.Element) | undefined
  value?: number | undefined
  defaultValue?: number | undefined
  min?: number | undefined
  max?: number | undefined
  step?: number | undefined
  precision?: number | undefined
  parser?: InputNumberParser | undefined
  formatter?: InputNumberFormatter | undefined
  disabled?: boolean | undefined
  readOnly?: boolean | undefined
  keyboard?: boolean | undefined
  size?: 'sm' | 'md' | 'lg' | undefined
  variant?: 'outlined' | 'filled' | 'borderless' | 'underlined' | undefined
  onChange?: ((event: Event, value: number | undefined) => void) | undefined
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
        class={cn(inputNumberRootClassName, inputRootProps.class)}
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
