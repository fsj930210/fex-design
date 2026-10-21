import { getDatePickerHeaderActionLabel } from '@fex-design/core/date-picker/panel'
import { isPickerActionBlocked } from '@fex-design/core/date-picker/view'
import { callEventHandler } from '@fex-design/solid/primitives/call-event-handler'
import { datePickerHeaderNavigationClassName } from '@fex-design/components-styles/date-picker'
import { cn } from '@fex-design/utils'
import { splitProps } from 'solid-js'
import { ChevronLeftIcon } from '@fex-design/solid/icons/chevron-left'
import { ChevronRightIcon } from '@fex-design/solid/icons/chevron-right'
import { ChevronsLeftIcon } from '@fex-design/solid/icons/chevrons-left'
import { ChevronsRightIcon } from '@fex-design/solid/icons/chevrons-right'
import { Button, type ButtonProps } from '../button'

import { useCalendarContext } from '../calendar/calendar-context'

export interface DatePickerHeaderButtonProps extends ButtonProps {
  action:
    | 'previous-year'
    | 'previous-month'
    | 'next-month'
    | 'next-year'
    | 'previous-panel'
    | 'next-panel'
}

export function DatePickerHeaderButton(props: DatePickerHeaderButtonProps) {
  const [local, rest] = splitProps(props, ['action', 'class', 'children', 'onClick'])
  const calendar = useCalendarContext('DatePickerHeaderButton')
  const previous = () => local.action.startsWith('previous')
  const double = () => local.action.endsWith('year') || local.action.endsWith('panel')

  function runAction() {
    calendar.controller.navigate(local.action)
  }

  return (
    <Button
      {...rest}
      type="button"
      data-slot="date-picker-header-button"
      data-action={local.action}
      aria-label={
        rest['aria-label'] ??
        getDatePickerHeaderActionLabel(local.action, calendar.controller.getOptions().locale)
      }
      class={cn(datePickerHeaderNavigationClassName, local.class)}
      onClick={(event) => {
        callEventHandler(local.onClick, event)
        if (!isPickerActionBlocked(event)) runAction()
      }}
    >
      {local.children === undefined ? (
        double() ? (
          previous() ? (
            <ChevronsLeftIcon class="size-4 rtl:rotate-180" />
          ) : (
            <ChevronsRightIcon class="size-4 rtl:rotate-180" />
          )
        ) : previous() ? (
          <ChevronLeftIcon class="size-4 rtl:rotate-180" />
        ) : (
          <ChevronRightIcon class="size-4 rtl:rotate-180" />
        )
      ) : (
        local.children
      )}
    </Button>
  )
}
