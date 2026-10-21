import { calendarDefaultLocale } from '@fex-design/core/calendar'
import { usePickerAppearance } from './appearance-context'
import { isPickerActionBlocked } from '@fex-design/core/date-picker/view'
import { callEventHandler } from '@fex-design/solid/primitives/call-event-handler'
import { datePickerTodayClassName } from '@fex-design/components-styles/date-picker'
import { cn } from '@fex-design/utils'
import { splitProps } from 'solid-js'
import { Button, type ButtonProps } from '../button'

import { useFooterOwner } from './date-picker-footer-owner'

export function DatePickerToday(props: ButtonProps) {
  const picker = useFooterOwner()
  const appearance = usePickerAppearance()
  const [local, rest] = splitProps(props, ['class', 'onClick', 'children'])
  return (
    <Button
      {...rest}
      type="button"
      data-slot="date-picker-today"
      class={cn(datePickerTodayClassName, local.class)}
      onClick={(event) => {
        callEventHandler(local.onClick, event)
        if (!isPickerActionBlocked(event)) {
          picker.today()
        }
      }}
    >
      {local.children === undefined
        ? (appearance().calendarProps?.locale?.today ?? calendarDefaultLocale.today)
        : local.children}
    </Button>
  )
}

export type DatePickerTodayProps = ButtonProps
