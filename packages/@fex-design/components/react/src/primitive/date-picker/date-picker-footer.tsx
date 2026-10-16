import { usePickerAppearance } from './appearance-context'
import { getPickerContentKind } from '@fex-design/core/date-picker/view'
import { DatePickerToday } from './date-picker-today'
import { DatePickerCancel } from './date-picker-cancel'
import { DatePickerConfirm } from './date-picker-confirm'
import { cn } from '@fex-design/utils'

import { datePickerFooterClassName } from '@fex-design/components-styles/date-picker'
import { type ComponentProps, type ReactNode } from 'react'

import { useFooterOwner } from './date-picker-footer-owner'

export interface DatePickerFooterProps extends Omit<ComponentProps<'div'>, 'children'> {
  children?:
    | ReactNode
    | ((actions: {
        canConfirm: boolean
        today: () => void
        close: () => void
        clear: () => void
        confirm: () => void
        cancel: () => void
      }) => ReactNode)
}
export function DatePickerFooter({ className, style, children, ...props }: DatePickerFooterProps) {
  const context = useFooterOwner()
  const appearance = usePickerAppearance()
  const actions = {
    canConfirm: context.canConfirm,
    today: context.today,
    close: context.close,
    clear: context.clear,
    confirm: context.confirm,
    cancel: context.cancel,
  }
  if (getPickerContentKind(children) === 'hidden') return null
  return (
    <div
      {...props}
      style={{ ...appearance.styles?.footer, ...style }}
      data-slot="date-picker-footer"
      className={cn(datePickerFooterClassName, appearance.classNames?.footer, className)}
    >
      {getPickerContentKind(children) === 'default' ? <>
        <DatePickerToday className={appearance.classNames?.today} style={appearance.styles?.today} />
        {context.footerView.showCancel ? <DatePickerCancel className={appearance.classNames?.cancel} style={appearance.styles?.cancel} /> : null}
        {context.footerView.showConfirm ? <DatePickerConfirm className={appearance.classNames?.confirm} style={appearance.styles?.confirm} /> : null}
      </> : typeof children === 'function' ? children(actions) : children}
    </div>
  )
}
