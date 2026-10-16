import { usePickerAppearance } from './appearance-context'
import type { DatePickerInputProps, DatePickerEndpointProps } from './appearance.types'
import { getPickerInputProps, getPickerControlProps } from '@fex-design/core/date-picker/safe-props'
import { getDatePickerInputAttributes } from '@fex-design/core/date-picker/input'
import { getRangePickerInputPlaceholder, getRangePickerSeparator, isPickerContentProvided } from '@fex-design/core/date-picker/view'
import { type HTMLAttributes, type FocusEventHandler, type MouseEventHandler, type ReactNode, type Ref, type RefCallback } from 'react'
import { useComposedRef } from '@fex-design/react/hooks/use-composed-ref'
import { useIsomorphicLayoutEffect } from '@fex-design/react/hooks/use-isomorphic-layout-effect'
import { usePickerTrigger } from './use-picker-trigger'
import { cn } from '@fex-design/utils'
import { CalendarIcon } from '@fex-design/react/icons/calendar'
import { InputRoot, InputControl, InputClear, InputPrefix, InputSuffix, type InputRootProps } from '../input'
import { useRangePickerContext, type RangePickerContextValue } from './context'
import { datePickerAffixClassName, datePickerRangeFieldClassName, datePickerRangeTriggerClassName, datePickerInputPreviewClassName, datePickerRangeInputClassName, datePickerRangeInputControlClassName, datePickerRangeSeparatorClassName } from '@fex-design/components-styles/date-picker'

export interface RangePickerTriggerBinding {
  props: HTMLAttributes<HTMLElement>
  ref: RefCallback<HTMLElement>
  state: RangePickerContextValue
}
export type RangePickerTriggerProps = Omit<InputRootProps, 'value' | 'defaultValue' | 'onValueChange' | 'onClear' | 'readOnly' | 'children' | 'prefix' | 'onFocus' | 'onClick' | 'ref'> & {
  ref?: Ref<HTMLElement> | undefined
  onFocus?: FocusEventHandler<HTMLElement> | undefined
  onClick?: MouseEventHandler<HTMLElement> | undefined
  children?: ((binding: RangePickerTriggerBinding) => ReactNode) | undefined
  inputProps?: DatePickerInputProps | undefined
  startInputProps?: DatePickerEndpointProps | undefined
  endInputProps?: DatePickerEndpointProps | undefined
  startPlaceholder?: string | undefined
  endPlaceholder?: string | undefined
  separator?: ReactNode | undefined
  suffix?: ReactNode | undefined
}

export function RangePickerTrigger({ children, inputProps, startInputProps, endInputProps, startPlaceholder, endPlaceholder, separator, suffix, className, ref: userRef, onClick, onFocus, ...props }: RangePickerTriggerProps) {
  const context = useRangePickerContext('RangePickerTrigger')
  const appearance = usePickerAppearance()
  const input = getPickerInputProps(inputProps ?? appearance.inputProps)
  const start = getPickerControlProps(input, startInputProps ?? appearance.startInputProps, true)
  const end = getPickerControlProps(input, endInputProps ?? appearance.endInputProps, true)
  const trigger = usePickerTrigger(context)
  const ref = useComposedRef(trigger.ref, userRef)
  // Only synchronize a core focus request with the rendered input; selection stays in core.
  useIsomorphicLayoutEffect(() => {
    if (!children && context.open && context.focusRequest) trigger.focusInput(context.focusRequest.part)
  }, [children, context.open, context.focusRequest, trigger.focusInput])
  const triggerProps = { ...props, size: props.size ?? input.size ?? 'md', variant: props.variant ?? input.variant ?? 'outlined', style: { ...input.styles?.root, ...input.style, ...props.style }, className: cn(datePickerRangeTriggerClassName, input.classNames?.root, input.className, className), 'aria-haspopup': 'dialog' as const, 'aria-expanded': context.open, 'data-state': context.open ? 'open' : 'closed',
    onClick(event: Parameters<NonNullable<typeof onClick>>[0]) { onClick?.(event); trigger.click(event) },
    onFocus(event: Parameters<NonNullable<typeof onFocus>>[0]) { onFocus?.(event); trigger.focus(event) },
  }
  const { onFocus: _fieldFocus, ...fieldProps } = triggerProps
  if (children) return children({ props: triggerProps, ref, state: context })
  return (
    <InputRoot {...fieldProps} ref={ref} value={''} disabled={context.disabled} readOnly={true}>
      <div className={datePickerRangeFieldClassName}>
        {isPickerContentProvided(input.prefix) ? <InputPrefix className={input.classNames?.prefix} style={input.styles?.prefix}>{input.prefix}</InputPrefix> : null}
        <InputRoot data-range-part="start" value={context.startText} disabled={context.disabled} readOnly={true} data-active={context.open && context.activePart === 'start' ? 'true' : undefined} className={datePickerRangeInputClassName}>
          <InputControl {...getDatePickerInputAttributes(start)} className={cn(datePickerRangeInputControlClassName, context.triggerView.startPreview && datePickerInputPreviewClassName, input.classNames?.control, start.className)} style={{ ...input.styles?.control, ...start.style }} placeholder={getRangePickerInputPlaceholder('start', startPlaceholder ?? start.placeholder)} onFocus={event => { start.onFocus?.(event); onFocus?.(event); trigger.focus(event, 'start') }} />
        </InputRoot>
      </div>
      <span aria-hidden="true" data-default-separator={separator == null ? 'true' : undefined} className={cn(datePickerRangeSeparatorClassName, appearance.classNames?.separator)} style={appearance.styles?.separator}>{getRangePickerSeparator(separator)}</span>
      <div className={datePickerRangeFieldClassName}>
        <InputRoot data-range-part="end" value={context.endText} disabled={context.disabled} readOnly={true} data-active={context.open && context.activePart === 'end' ? 'true' : undefined} className={datePickerRangeInputClassName}>
          <InputControl {...getDatePickerInputAttributes(end)} className={cn(datePickerRangeInputControlClassName, context.triggerView.endPreview && datePickerInputPreviewClassName, input.classNames?.control, end.className)} style={{ ...input.styles?.control, ...end.style }} placeholder={getRangePickerInputPlaceholder('end', endPlaceholder ?? end.placeholder)} onFocus={event => { end.onFocus?.(event); onFocus?.(event); trigger.focus(event, 'end') }} />
        </InputRoot>
        <div data-slot="date-picker-affix" className={datePickerAffixClassName}>
          <InputSuffix className={input.classNames?.suffix} style={input.styles?.suffix}>{suffix ?? input.suffix ?? <CalendarIcon className="size-4" />}</InputSuffix>
          {context.canClear ? <InputClear className={input.classNames?.clear} style={input.styles?.clear} aria-label="清除日期" onPointerDown={event => { event.preventDefault(); event.stopPropagation() }} onClick={event => { event.preventDefault(); event.stopPropagation(); context.clear() }} /> : null}
        </div>
      </div>
    </InputRoot>
  )
}
