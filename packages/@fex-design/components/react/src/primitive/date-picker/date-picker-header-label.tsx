import { isPickerActionBlocked } from '@fex-design/core/date-picker/view'
import { getDatePickerHeaderLabel } from '@fex-design/core/date-picker/panel'
import {
  getDatePickerHeaderLabelParts,
  getNextPanelByHeaderLabel,
} from '@fex-design/core/date-picker/panel'
import type { DatePickerHeaderLabelPart } from '@fex-design/core/date-picker/types'
import { datePickerHeaderLabelClassName } from '@fex-design/components-styles/date-picker'
import { cn } from '@fex-design/utils'
import { useState, type ComponentProps, type ReactNode } from 'react'

import { Button } from '@fex-design/react/primitive/button'
import { useCalendarContext } from '../calendar/calendar-context'

import { useHeaderOwner } from './date-picker-header-owner'

export interface DatePickerHeaderLabelProps extends Omit<ComponentProps<'button'>, 'children'> {
  part: DatePickerHeaderLabelPart
  children?: ReactNode
}

export function DatePickerHeaderLabel({
  part,
  className,
  children,
  onClick,
  onMouseEnter,
  onMouseLeave,
  ...props
}: DatePickerHeaderLabelProps) {
  const context = useHeaderOwner()
  const calendar = useCalendarContext('DatePickerHeaderLabel')
  const [hovered, setHovered] = useState(false)
  const visible = getDatePickerHeaderLabelParts(context.picker, calendar.state.panel).includes(part)
  const label =
    children === undefined
      ? getDatePickerHeaderLabel(
          calendar.state.viewDate,
          calendar.state.panel,
          part,
          calendar.controller.getOptions().locale,
        )
      : children

  return (
    <Button
      {...props}
      type="button"
      hidden={!visible || props.hidden}
      data-slot="date-picker-header-label"
      data-part={part}
      data-hovered={hovered ? 'true' : undefined}
      className={cn(datePickerHeaderLabelClassName, className)}
      onMouseEnter={(event) => {
        setHovered(true)
        onMouseEnter?.(event)
      }}
      onMouseLeave={(event) => {
        setHovered(false)
        onMouseLeave?.(event)
      }}
      onClick={(event) => {
        onClick?.(event)
        if (isPickerActionBlocked(event)) return
        const nextPanel = getNextPanelByHeaderLabel(part)
        calendar.controller.setPanel(nextPanel)
      }}
    >
      {label}
    </Button>
  )
}
