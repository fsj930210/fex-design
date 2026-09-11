import {
  inputAddonAfterClassName,
  inputAddonBeforeClassName,
  inputClearClassName,
  inputControlClassName,
  inputGroupClassName,
  inputPrefixClassName,
  inputRootClassName,
  inputSuffixClassName,
} from '@fex-design/styles/input'
import type { InputVisualOptions } from '@fex-design/core/input/types'
import { cn } from '@fex/utils'
import { createContext, splitProps, type JSX, type ParentProps, useContext } from 'solid-js'
import { CircleXIcon } from '../../icon/circle-x'
import { createInput, type InputChangeReason } from './create-input'

type InputContextValue = ReturnType<typeof createInput>
const InputContext = createContext<InputContextValue>()

export function InputGroup(props: ParentProps<JSX.HTMLAttributes<HTMLDivElement>>) {
  const [local, rest] = splitProps(props, ['class', 'children'])
  return (
    <div
      {...rest}
      role="group"
      data-slot="input-group"
      class={cn(inputGroupClassName, local.class)}
    >
      {local.children}
    </div>
  )
}

export interface InputRootProps
  extends ParentProps<Omit<JSX.HTMLAttributes<HTMLDivElement>, 'size'>>, InputVisualOptions {
  value?: string | undefined
  defaultValue?: string | undefined
  disabled?: boolean | undefined
  readOnly?: boolean | undefined
  onValueChange?:
    | ((value: string, meta: { reason: InputChangeReason; event?: InputEvent }) => void)
    | undefined
  onClear?: (() => void) | undefined
}
export function InputRoot(props: InputRootProps) {
  const [local, rest] = splitProps(props, [
    'children',
    'class',
    'value',
    'defaultValue',
    'disabled',
    'readOnly',
    'size',
    'variant',
    'onValueChange',
    'onClear',
  ])
  const input = createInput({
    value: () => props.value,
    defaultValue: props.defaultValue,
    disabled: () => props.disabled,
    readOnly: () => props.readOnly,
    onValueChange: (value, meta) => props.onValueChange?.(value, meta),
    onClear: () => props.onClear?.(),
  })
  return (
    <InputContext.Provider value={input}>
      <div
        {...rest}
        data-slot="input-root"
        data-disabled={input.disabled() || undefined}
        data-readonly={input.readOnly() || undefined}
        data-size={local.size ?? 'md'}
        data-variant={local.variant ?? 'outlined'}
        class={cn(inputRootClassName({ size: local.size, variant: local.variant }), local.class)}
      >
        {local.children}
      </div>
    </InputContext.Provider>
  )
}

function useInputContext(name: string) {
  const context = useContext(InputContext)
  if (!context) throw new Error(`${name} must be used inside InputRoot.`)
  return context
}
export function InputControl(props: JSX.InputHTMLAttributes<HTMLInputElement>) {
  const context = useInputContext('InputControl')
  const [local, rest] = splitProps(props, [
    'class',
    'onInput',
    'ref',
    'disabled',
    'readOnly',
    'aria-invalid',
  ])
  return (
    <input
      {...rest}
      ref={(node) => {
        context.setFocusElement(node)
        if (typeof local.ref === 'function') local.ref(node)
      }}
      value={context.value()}
      disabled={context.disabled() || local.disabled}
      readOnly={context.readOnly() || local.readOnly}
      aria-invalid={local['aria-invalid']}
      data-slot="input-control"
      class={cn(inputControlClassName, local.class)}
      onInput={(event) => {
        if (typeof local.onInput === 'function') local.onInput(event)
        if (!event.defaultPrevented) context.setValue(event.currentTarget.value, 'input', event)
      }}
    />
  )
}
function part(slot: string, className: string) {
  return (props: ParentProps<JSX.HTMLAttributes<HTMLSpanElement>>) => (
    <span {...props} data-slot={slot} class={cn(className, props.class)}>
      {props.children}
    </span>
  )
}
export const InputPrefix = part('input-prefix', inputPrefixClassName)
export const InputSuffix = part('input-suffix', inputSuffixClassName)
export const InputAddonBefore = part('input-addon-before', inputAddonBeforeClassName)
export const InputAddonAfter = part('input-addon-after', inputAddonAfterClassName)
export function InputClear(
  props: ParentProps<JSX.ButtonHTMLAttributes<HTMLButtonElement>> & { forceMount?: boolean },
) {
  const context = useInputContext('InputClear')
  const [local, rest] = splitProps(props, ['forceMount', 'class', 'children', 'onClick'])
  return local.forceMount || context.canClear() ? (
    <button
      {...rest}
      type="button"
      data-slot="input-clear"
      disabled={!local.forceMount && !context.canClear()}
      class={cn(inputClearClassName, local.class)}
      onClick={(event) => {
        if (typeof local.onClick === 'function') local.onClick(event)
        if (!event.defaultPrevented) context.clear()
      }}
    >
      {local.children ?? <CircleXIcon />}
    </button>
  ) : null
}
