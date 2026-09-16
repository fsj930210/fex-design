import {
  inputNumberDecrementClassName,
  inputNumberIncrementClassName,
} from '@fex-design/styles/input-number'
import { cn } from '@fex/utils'
import { splitProps, type ParentProps } from 'solid-js'
import type { ButtonProps } from '../button/button.types'
import { Button } from '../button/button'
import { MinusIcon } from '../../icon/minus'
import { PlusIcon } from '../../icon/plus'
import { useInputNumberContext } from './input-number-context'
export function InputNumberIncrement(props: ParentProps<ButtonProps>) {
  const n = useInputNumberContext('InputNumberIncrement')
  const [local, rest] = splitProps(props, ['children', 'class', 'onClick', 'onPointerDown'])
  return (
    <Button
      {...rest}
      variant="text"
      data-slot="input-number-increment"
      aria-label={props['aria-label'] ?? 'Increase value'}
      disabled={props.disabled || !n.canIncrement()}
      class={cn(inputNumberIncrementClassName, local.class)}
      onPointerDown={(e) => {
        if (typeof local.onPointerDown === 'function') local.onPointerDown(e)
        if (!e.defaultPrevented) e.preventDefault()
      }}
      onClick={(e) => {
        if (typeof local.onClick === 'function') local.onClick(e)
        if (!e.defaultPrevented) n.increment(e)
      }}
    >
      {local.children ?? <PlusIcon />}
    </Button>
  )
}
export function InputNumberDecrement(props: ParentProps<ButtonProps>) {
  const n = useInputNumberContext('InputNumberDecrement')
  const [local, rest] = splitProps(props, ['children', 'class', 'onClick', 'onPointerDown'])
  return (
    <Button
      {...rest}
      variant="text"
      data-slot="input-number-decrement"
      aria-label={props['aria-label'] ?? 'Decrease value'}
      disabled={props.disabled || !n.canDecrement()}
      class={cn(inputNumberDecrementClassName, local.class)}
      onPointerDown={(e) => {
        if (typeof local.onPointerDown === 'function') local.onPointerDown(e)
        if (!e.defaultPrevented) e.preventDefault()
      }}
      onClick={(e) => {
        if (typeof local.onClick === 'function') local.onClick(e)
        if (!e.defaultPrevented) n.decrement(e)
      }}
    >
      {local.children ?? <MinusIcon />}
    </Button>
  )
}
