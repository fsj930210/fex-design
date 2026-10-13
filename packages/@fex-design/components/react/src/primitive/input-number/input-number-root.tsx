import type {
  InputNumberConstraints,
  InputNumberFormatter,
  InputNumberParser,
} from '@fex-design/core/input-number/types'
import type { ComponentProps } from 'react'
import { InputRoot } from '../input'
import { InputNumberContext } from './input-number-context'
import { useInputNumber } from './use-input-number'
import { cn } from '@fex-design/utils'
import { useLazyRef } from '@fex-design/react/hooks/use-lazy-ref'
import { inputNumberRootClassName } from '@fex-design/components-styles/input-number'

export interface InputNumberRootProps
  extends
    Omit<ComponentProps<typeof InputRoot>, 'value' | 'defaultValue' | 'onValueChange' | 'onChange'>,
    InputNumberConstraints {
  value?: number | undefined
  defaultValue?: number | undefined
  parser?: InputNumberParser | undefined
  formatter?: InputNumberFormatter | undefined
  keyboard?: boolean | undefined
  onChange?: ((event: Event, value: number | undefined) => void) | undefined
  controlled?: boolean | undefined
}

export function InputNumberRoot(rootProps: InputNumberRootProps) {
  const hasValue = useLazyRef(() => Object.prototype.hasOwnProperty.call(rootProps, 'value')).current
  const {
  value,
  defaultValue,
  min,
  max,
  step,
  precision,
  parser,
  formatter,
  keyboard = true,
  disabled,
  readOnly,
  onChange,
  controlled,
  children,
  className,
  ...props
  } = rootProps
  const inputNumber = useInputNumber({
    value,
    defaultValue,
    min,
    max,
    step,
    precision,
    parser,
    formatter,
    keyboard,
    disabled,
    readOnly,
    onChange,
    controlled: controlled ?? hasValue,
  })
  return (
    <InputNumberContext value={inputNumber}>
      <InputRoot
        {...props}
        value={inputNumber.draft}
        className={cn(inputNumberRootClassName, className)}
        disabled={disabled}
        readOnly={readOnly}
        data-slot="input-number-root"
        data-out-of-range={inputNumber.outOfRange ? 'true' : undefined}
        onValueChange={(text, meta) => {
          if (meta.reason === 'input') inputNumber.input(text, meta.event)
        }}
      >
        {children}
      </InputRoot>
    </InputNumberContext>
  )
}
