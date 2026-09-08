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
import {
  type ChangeEvent,
  type ComponentProps,
  type HTMLAttributes,
  type MouseEvent,
  type ReactNode,
  type Ref,
} from 'react'
import { CircleXIcon } from '../../icon/circle-x'
import { useComposedRef } from '../../hooks/use-composed-ref'
import { InputContext, useInputContext } from './input-context'
import { useInput, type UseInputOptions } from './use-input'

export interface InputRootProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange' | 'size'>,
    UseInputOptions,
    InputVisualOptions {
  ref?: Ref<HTMLDivElement> | undefined
}

export interface InputGroupProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement> | undefined
}

export function InputGroup({ className, ref, ...props }: InputGroupProps) {
  return (
    <div
      {...props}
      ref={ref}
      role="group"
      data-slot="input-group"
      className={cn(inputGroupClassName, className)}
    />
  )
}

export function InputRoot({
  value,
  defaultValue,
  disabled,
  readOnly,
  size = 'md',
  variant = 'outlined',
  onValueChange,
  onClear,
  className,
  ref,
  children,
  ...props
}: InputRootProps) {
  const input = useInput({
    value,
    defaultValue,
    disabled,
    readOnly,
    onValueChange,
    onClear,
  })

  return (
    <InputContext value={input}>
      <div
        {...props}
        ref={ref}
        data-slot="input-root"
        data-disabled={input.disabled ? 'true' : undefined}
        data-readonly={input.readOnly ? 'true' : undefined}
        data-size={size}
        data-variant={variant}
        className={cn(inputRootClassName({ size, variant }), className)}
      >
        {children}
      </div>
    </InputContext>
  )
}

export interface InputControlProps extends ComponentProps<'input'> {
  ref?: Ref<HTMLInputElement> | undefined
}

export function InputControl({
  className,
  disabled,
  readOnly,
  'aria-invalid': ariaInvalid,
  onChange,
  ref,
  ...props
}: InputControlProps) {
  const context = useInputContext('InputControl')
  const composedRef = useComposedRef(ref, context.focusRef)

  return (
    <input
      {...props}
      ref={composedRef}
      value={context.value}
      disabled={context.disabled || disabled}
      readOnly={context.readOnly || readOnly}
      aria-invalid={ariaInvalid}
      data-slot="input-control"
      className={cn(inputControlClassName, className)}
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        onChange?.(event)
        if (!event.defaultPrevented) {
          context.setValue(event.currentTarget.value, { reason: 'input', event })
        }
      }}
    />
  )
}

export interface InputPrefixProps extends ComponentProps<'span'> {
  ref?: Ref<HTMLSpanElement> | undefined
}

export function InputPrefix({ className, ref, ...props }: InputPrefixProps) {
  return (
    <span
      {...props}
      ref={ref}
      data-slot="input-prefix"
      className={cn(inputPrefixClassName, className)}
    />
  )
}

export interface InputSuffixProps extends ComponentProps<'span'> {
  ref?: Ref<HTMLSpanElement> | undefined
}

export function InputSuffix({ className, ref, ...props }: InputSuffixProps) {
  return (
    <span
      {...props}
      ref={ref}
      data-slot="input-suffix"
      className={cn(inputSuffixClassName, className)}
    />
  )
}

export interface InputAddonBeforeProps extends ComponentProps<'span'> {
  ref?: Ref<HTMLSpanElement> | undefined
}

export function InputAddonBefore({ className, ref, ...props }: InputAddonBeforeProps) {
  return (
    <span
      {...props}
      ref={ref}
      data-slot="input-addon-before"
      className={cn(inputAddonBeforeClassName, className)}
    />
  )
}

export interface InputAddonAfterProps extends ComponentProps<'span'> {
  ref?: Ref<HTMLSpanElement> | undefined
}

export function InputAddonAfter({ className, ref, ...props }: InputAddonAfterProps) {
  return (
    <span
      {...props}
      ref={ref}
      data-slot="input-addon-after"
      className={cn(inputAddonAfterClassName, className)}
    />
  )
}

export interface InputClearProps extends Omit<ComponentProps<'button'>, 'type'> {
  forceMount?: boolean
  ref?: Ref<HTMLButtonElement> | undefined
  children?: ReactNode
}

export interface InputClearButtonProps extends Omit<ComponentProps<'button'>, 'type'> {
  ref?: Ref<HTMLButtonElement> | undefined
  children?: ReactNode
  'data-slot'?: string | undefined
}

export function InputClearButton({
  className,
  children,
  'aria-label': ariaLabel = 'Clear input',
  'data-slot': dataSlot = 'input-clear',
  ref,
  ...props
}: InputClearButtonProps) {
  return (
    <button
      {...props}
      ref={ref}
      type="button"
      aria-label={ariaLabel}
      data-slot={dataSlot}
      className={cn(inputClearClassName, className)}
    >
      {children ?? <CircleXIcon />}
    </button>
  )
}

export function InputClear({
  forceMount = false,
  className,
  children,
  'aria-label': ariaLabel = 'Clear input',
  onClick,
  ref,
  ...props
}: InputClearProps) {
  const input = useInputContext('InputClear')
  if (!forceMount && !input.canClear) return null

  return (
    <InputClearButton
      {...props}
      ref={ref}
      aria-label={ariaLabel}
      data-visible={input.canClear ? 'true' : 'false'}
      disabled={!forceMount && !input.canClear}
      className={className}
      onClick={(event: MouseEvent<HTMLButtonElement>) => {
        onClick?.(event)
        if (!event.defaultPrevented) input.clear()
      }}
    >
      {children}
    </InputClearButton>
  )
}
