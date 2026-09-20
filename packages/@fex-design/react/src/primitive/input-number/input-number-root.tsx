import type {
  InputNumberConstraints,
  InputNumberFormatter,
  InputNumberParser,
} from '@fex-design/core/input-number/types'
import type { ComponentProps } from 'react'
import { InputRoot } from '../input/input'
import { InputNumberContext } from './input-number-context'
import { useInputNumber } from './use-input-number'
import { cn } from '@fex/utils'

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

export function InputNumberRoot({
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
}: InputNumberRootProps) {
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
    controlled: controlled ?? value !== undefined,
  })
  return (
    <InputNumberContext value={inputNumber}>
      <InputRoot
        {...props}
        value={inputNumber.draft}
        className={cn('pr-5', className)}
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
