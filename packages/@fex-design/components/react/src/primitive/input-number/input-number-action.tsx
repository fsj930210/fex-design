import {
  inputNumberDecrementClassName,
  inputNumberIncrementClassName,
} from '@fex-design/components-styles/input-number'
import { cn } from '@fex-design/utils'
import type { ComponentProps, PointerEvent } from 'react'
import { Button } from '../button/button'
import { MinusIcon } from '@fex-design/react/icons/minus'
import { PlusIcon } from '@fex-design/react/icons/plus'
import { useInputNumberContext } from './input-number-context'

export interface InputNumberActionProps extends Omit<ComponentProps<typeof Button>, 'onChange'> {}

function preventFocusLoss(event: PointerEvent<HTMLButtonElement>) {
  event.preventDefault()
}

export function InputNumberIncrement({
  className,
  children,
  onClick,
  onPointerDown,
  ...props
}: InputNumberActionProps) {
  const inputNumber = useInputNumberContext('InputNumberIncrement')
  return (
    <Button
      {...props}
      variant="text"
      data-slot="input-number-increment"
      data-action="increment"
      aria-label={props['aria-label'] ?? 'Increase value'}
      disabled={props.disabled || !inputNumber.canIncrement}
      className={cn(inputNumberIncrementClassName, className)}
      onPointerDown={(event) => {
        onPointerDown?.(event)
        if (!event.defaultPrevented) preventFocusLoss(event)
      }}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented) inputNumber.increment(event)
      }}
    >
      {children ?? <PlusIcon />}
    </Button>
  )
}

export function InputNumberDecrement({
  className,
  children,
  onClick,
  onPointerDown,
  ...props
}: InputNumberActionProps) {
  const inputNumber = useInputNumberContext('InputNumberDecrement')
  return (
    <Button
      {...props}
      variant="text"
      data-slot="input-number-decrement"
      data-action="decrement"
      aria-label={props['aria-label'] ?? 'Decrease value'}
      disabled={props.disabled || !inputNumber.canDecrement}
      className={cn(inputNumberDecrementClassName, className)}
      onPointerDown={(event) => {
        onPointerDown?.(event)
        if (!event.defaultPrevented) preventFocusLoss(event)
      }}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented) inputNumber.decrement(event)
      }}
    >
      {children ?? <MinusIcon />}
    </Button>
  )
}
