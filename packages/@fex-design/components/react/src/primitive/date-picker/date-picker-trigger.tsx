import { usePickerAppearance } from './appearance-context'
import type { DatePickerInputProps } from './appearance.types'
import { getPickerInputProps, getPickerControlProps } from '@fex-design/core/date-picker/safe-props'
import { getDatePickerInputAttributes } from '@fex-design/core/date-picker/input'
import { isPickerContentProvided } from '@fex-design/core/date-picker/view'
import { type HTMLAttributes, type FocusEventHandler, type MouseEventHandler, type ReactNode, type Ref, type RefCallback } from 'react'
import { useComposedRef } from '@fex-design/react/hooks/use-composed-ref'
import { usePickerTrigger } from './use-picker-trigger'
import { cn } from '@fex-design/utils'
import { CalendarIcon } from '@fex-design/react/icons/calendar'
import { InputRoot, InputControl, InputClear, InputPrefix, InputSuffix, type InputRootProps } from '../input'
import { useDatePickerContext, type DatePickerContextValue } from './context'
import { DatePickerTags } from './date-picker-tags'
import { datePickerAffixClassName, datePickerTriggerClassName, datePickerInputPreviewClassName, datePickerMultipleTagsClassName, datePickerMultipleInputClassName } from '@fex-design/components-styles/date-picker'

export interface DatePickerTriggerBinding {
  props: HTMLAttributes<HTMLElement>
  ref: RefCallback<HTMLElement>
  state: DatePickerContextValue
}
export type DatePickerTriggerProps = Omit<InputRootProps, 'value' | 'defaultValue' | 'onValueChange' | 'onClear' | 'readOnly' | 'children' | 'prefix' | 'onFocus' | 'onClick' | 'ref'> & {
  ref?: Ref<HTMLElement> | undefined
  onFocus?: FocusEventHandler<HTMLElement> | undefined
  onClick?: MouseEventHandler<HTMLElement> | undefined
  children?: ((binding: DatePickerTriggerBinding) => ReactNode) | undefined
  inputProps?: DatePickerInputProps | undefined
  placeholder?: string | undefined
  prefix?: ReactNode | undefined
  suffix?: ReactNode | undefined
}

export function DatePickerTrigger({ children, inputProps, placeholder, prefix, suffix, className, ref: userRef, onClick, onFocus, ...props }: DatePickerTriggerProps) {
  const context = useDatePickerContext('DatePickerTrigger')
  const appearance = usePickerAppearance()
  const input = getPickerInputProps(inputProps ?? appearance.inputProps)
  const control = getPickerControlProps(input)
  const trigger = usePickerTrigger(context)
  const ref = useComposedRef(trigger.ref, userRef)
  const triggerProps = { ...props, size: props.size ?? input.size ?? 'md', variant: props.variant ?? input.variant ?? 'outlined', style: { ...input.styles?.root, ...input.style, ...props.style }, className: cn(datePickerTriggerClassName, input.classNames?.root, input.className, className), 'aria-haspopup': 'dialog' as const, 'aria-expanded': context.open, 'data-state': context.open ? 'open' : 'closed',
    onClick(event: Parameters<NonNullable<typeof onClick>>[0]) { onClick?.(event); trigger.click(event) },
    onFocus(event: Parameters<NonNullable<typeof onFocus>>[0]) { onFocus?.(event); trigger.focus(event) },
  }
  const { onFocus: _fieldFocus, ...fieldProps } = triggerProps
  if (children) return children({ props: triggerProps, ref, state: context })
  return (
    <InputRoot {...fieldProps} ref={ref} value={context.inputValue} disabled={context.disabled} readOnly={true}>
      {isPickerContentProvided(prefix ?? input.prefix) ? <InputPrefix className={input.classNames?.prefix} style={input.styles?.prefix}>{prefix ?? input.prefix}</InputPrefix> : null}
      {context.triggerView.showTags ? <DatePickerTags className={datePickerMultipleTagsClassName} /> : null}
      <InputControl {...getDatePickerInputAttributes(control)} onFocus={event => { control.onFocus?.(event); onFocus?.(event); trigger.focus(event) }} className={cn(context.triggerView.preview && datePickerInputPreviewClassName, context.triggerView.hasTags && datePickerMultipleInputClassName, input.classNames?.control)} style={input.styles?.control} placeholder={context.triggerView.hasTags ? '' : (placeholder ?? input.placeholder ?? context.format)} />
      <div data-slot="date-picker-affix" className={datePickerAffixClassName}>
        <InputSuffix className={input.classNames?.suffix} style={input.styles?.suffix}>{suffix ?? input.suffix ?? <CalendarIcon className="size-4" />}</InputSuffix>
        {context.canClear ? <InputClear className={input.classNames?.clear} style={input.styles?.clear} aria-label="清除日期" onPointerDown={event => { event.preventDefault(); event.stopPropagation() }} onClick={event => { event.preventDefault(); event.stopPropagation(); context.clear() }} /> : null}
      </div>
    </InputRoot>
  )
}
