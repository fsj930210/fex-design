import { isPickerActionBlocked } from '@fex-design/core/date-picker/view'
import { callEventHandler } from '@fex-design/solid/primitives/call-event-handler'
import { getDatePickerHeaderLabel } from '@fex-design/core/date-picker/panel'
import { datePickerHeaderLabelClassName } from '@fex-design/components-styles/date-picker'
import { cn } from '@fex-design/utils'
import { createSignal, splitProps } from 'solid-js'

import { Button, type ButtonProps } from '../button'
import { getNextPanelByHeaderLabel } from '@fex-design/core/date-picker/panel'
import { useCalendarContext } from '../calendar/calendar-context'
import { useHeaderOwner } from './date-picker-header-owner'
import { getDatePickerHeaderLabelParts } from '@fex-design/core/date-picker/panel'

export interface DatePickerHeaderLabelProps extends ButtonProps {
  part: 'year' | 'month'
}

export function DatePickerHeaderLabel(props: DatePickerHeaderLabelProps) {
  const [local, rest] = splitProps(props, [
    'part',
    'class',
    'children',
    'onClick',
    'onMouseEnter',
    'onMouseLeave',
  ])
  const [hovered, setHovered] = createSignal(false)
  const calendar = useCalendarContext('DatePickerHeaderLabel')
  const owner = useHeaderOwner()
  const label = () =>
    getDatePickerHeaderLabel(
      calendar.state().viewDate,
      calendar.state().panel,
      local.part,
      calendar.controller.getOptions().locale,
    )
  return (
    <Button
      {...rest}
      type="button"
      hidden={
        !getDatePickerHeaderLabelParts(owner.picker, calendar.state().panel).includes(local.part) ||
        rest.hidden
      }
      data-slot="date-picker-header-label"
      data-part={local.part}
      data-hovered={hovered() ? 'true' : undefined}
      class={cn(datePickerHeaderLabelClassName, local.class)}
      onMouseEnter={(event) => {
        setHovered(true)
        callEventHandler(local.onMouseEnter, event)
      }}
      onMouseLeave={(event) => {
        setHovered(false)
        callEventHandler(local.onMouseLeave, event)
      }}
      onClick={(event) => {
        callEventHandler(local.onClick, event)
        if (!isPickerActionBlocked(event))
          calendar.controller.setPanel(getNextPanelByHeaderLabel(local.part))
      }}
    >
      {local.children === undefined ? label() : local.children}
    </Button>
  )
}
