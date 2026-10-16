import { timePickerAffixClassName } from '@fex-design/components-styles/time-picker'
import { useComposedRef } from '@fex-design/react/hooks/use-composed-ref'
import { ClockIcon } from '@fex-design/react/icons/clock'
import {
  InputClear,
  InputControl,
  InputPrefix,
  InputRoot,
  InputSuffix,
  type InputRootProps,
} from '../input'
import { useTimePickerTrigger } from './use-time-picker-trigger'
import type { TimePickerContextValue } from './time-picker-context'
import { type ComponentProps, type HTMLAttributes, type RefCallback, type ReactNode } from 'react'
import { useTimePickerContext } from './time-picker-context'

export interface TimePickerTriggerProps extends Omit<
  InputRootProps,
  'value' | 'defaultValue' | 'onValueChange' | 'onClear' | 'children' | 'prefix' | 'ref' | 'onClick' | 'onFocus' | 'onBlur'
> {
  ref?: import('react').Ref<HTMLElement> | undefined
  onClick?: HTMLAttributes<HTMLElement>['onClick'] | undefined
  onFocus?: HTMLAttributes<HTMLElement>['onFocus'] | undefined
  onBlur?: HTMLAttributes<HTMLElement>['onBlur'] | undefined
  children?: ((binding: { props: HTMLAttributes<HTMLElement>; ref: RefCallback<HTMLElement>; state: TimePickerContextValue }) => ReactNode) | undefined
  invalid?: boolean | undefined
  allowClear?: boolean | undefined
  placeholder?: string | undefined
  prefix?: ReactNode | undefined
  suffix?: ReactNode | undefined
  inputProps?: Omit<ComponentProps<typeof InputControl>, 'value' | 'defaultValue'> | undefined
}

export function TimePickerTrigger({
  children,
  invalid = false,
  allowClear = true,
  placeholder,
  prefix,
  suffix,
  inputProps,
  ref: userRef,
  onClick,
  onFocus,
  onBlur,
  ...props
}: TimePickerTriggerProps) {
  const context = useTimePickerContext('TimePickerTrigger')
  const trigger = useTimePickerTrigger()
  const ref = useComposedRef<HTMLElement>(trigger.ref, userRef)
  const triggerProps = {
    ...props,
    ...trigger.props,
    onClick(event: Parameters<NonNullable<HTMLAttributes<HTMLElement>['onClick']>>[0]) {
      onClick?.(event)
      trigger.props.onClick?.(event)
    },
    onFocus(event: Parameters<NonNullable<HTMLAttributes<HTMLElement>['onFocus']>>[0]) {
      onFocus?.(event)
      trigger.props.onFocus?.(event)
    },
    onBlur(event: Parameters<NonNullable<HTMLAttributes<HTMLElement>['onBlur']>>[0]) {
      onBlur?.(event)
      trigger.props.onBlur?.(event)
    },
  }
  const text = context.snapshot.inputValue
  const canClear = allowClear && Boolean(text) && !context.disabled && !context.readOnly
  const input = context.controller.input
  const clear = context.controller.clear
  if (children) return children({ props: triggerProps, ref, state: context })
  return (
        <InputRoot
          {...triggerProps}
          ref={ref}
          role={undefined}
          value={text}
          disabled={context.disabled}
          readOnly={context.readOnly}
          onValueChange={input}
          onClear={allowClear ? clear : undefined}
        >
          {prefix ? <InputPrefix>{prefix}</InputPrefix> : null}
          <InputControl aria-label="Time" {...inputProps} aria-invalid={invalid || inputProps?.['aria-invalid']} placeholder={placeholder ?? inputProps?.placeholder ?? context.format} />
          <div data-slot="time-picker-affix" className={timePickerAffixClassName}>
            <InputSuffix>{suffix ?? <ClockIcon className="size-4" />}</InputSuffix>
            {canClear ? <InputClear onPointerDown={event => { event.preventDefault(); event.stopPropagation() }} onClick={event => { event.preventDefault(); event.stopPropagation(); clear() }} /> : null}
          </div>
        </InputRoot>
  )
}
