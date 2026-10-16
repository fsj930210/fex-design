import { usePickerAppearance } from './appearance-context'
import { mergeStyle } from '@fex-design/solid/primitives/merge-style'
import { getPickerContentKind } from '@fex-design/core/date-picker/view'
import { DatePickerToday } from './date-picker-today'
import { DatePickerCancel } from './date-picker-cancel'
import { DatePickerConfirm } from './date-picker-confirm'


import { datePickerFooterClassName } from '@fex-design/components-styles/date-picker'
import { cn } from '@fex-design/utils'
import { Show, splitProps, type JSX } from 'solid-js'

import { useFooterOwner } from './date-picker-footer-owner'

export interface DatePickerFooterProps extends Omit<
  JSX.HTMLAttributes<HTMLDivElement>,
  'children'
> {
  children?:
    | JSX.Element
    | ((actions: {
        canConfirm: () => boolean
        today: () => void
        close: () => void
        clear: () => void
        confirm: () => void
        cancel: () => void
      }) => JSX.Element)
}
export function DatePickerFooter(props: DatePickerFooterProps) {
  const [local, rest] = splitProps(props, ['class', 'style', 'children'])
  const picker = useFooterOwner()
  const appearance = usePickerAppearance()
  const actions = {
    get canConfirm() { return picker.canConfirm },
    today: picker.today,
    close: picker.close,
    clear: picker.clear,
    confirm: picker.confirm,
    cancel: picker.cancel,
  }
  return (
    <Show when={getPickerContentKind(local.children) !== 'hidden'}><div {...rest} style={mergeStyle(appearance().styles?.footer, local.style)} data-slot="date-picker-footer" class={cn(datePickerFooterClassName, appearance().classNames?.footer, local.class)}>
      {getPickerContentKind(local.children) === 'default' ? <>
        <DatePickerToday class={appearance().classNames?.today} style={appearance().styles?.today} />
        <Show when={picker.footerView.showCancel}><DatePickerCancel class={appearance().classNames?.cancel} style={appearance().styles?.cancel} /></Show>
        <Show when={picker.footerView.showConfirm}><DatePickerConfirm class={appearance().classNames?.confirm} style={appearance().styles?.confirm} /></Show>
      </> : typeof local.children === 'function' ? local.children(actions) : local.children}
    </div></Show>
  )
}
