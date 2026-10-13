import {
  datePickerHeaderClassName,
  datePickerHeaderDoubleIconClassName,
  datePickerHeaderLabelClassName,
  datePickerHeaderNavigationClassName,
  datePickerHeaderTitleClassName,
} from '@fex-design/components-styles/date-picker'
import { cn } from '@fex-design/utils'
import { Show, splitProps, type JSX, type ParentProps } from 'solid-js'
import { ChevronLeftIcon, ChevronRightIcon } from '@fex-design/solid/icons/chevron'
import { Button, type ButtonProps } from '../../ui/button'
import { getNextPanelByHeaderLabel } from '@fex-design/core/date-picker/panel'
import { useCalendarContext } from '../calendar/calendar-context'

export function DatePickerHeader(props: ParentProps<JSX.HTMLAttributes<HTMLDivElement>>) {
  const [local, rest] = splitProps(props, ['class', 'children'])
  return (
    <div
      {...rest}
      data-slot="date-picker-header"
      class={cn(datePickerHeaderClassName, local.class)}
    >
      {local.children}
    </div>
  )
}

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
      variant={rest.variant ?? 'ghost'}
      size={rest.size ?? 'icon-sm'}
      class={cn(datePickerHeaderNavigationClassName, local.class)}
      onClick={(event) => {
        if (typeof local.onClick === 'function') local.onClick(event)
        if (!event.defaultPrevented) runAction()
      }}
    >
      {local.children ?? (
        <>
          {previous() ? <ChevronLeftIcon class="size-4" /> : <ChevronRightIcon class="size-4" />}
          <Show when={double()}>
            {previous() ? (
              <ChevronLeftIcon class={cn(datePickerHeaderDoubleIconClassName, 'size-4')} />
            ) : (
              <ChevronRightIcon class={cn(datePickerHeaderDoubleIconClassName, 'size-4')} />
            )}
          </Show>
        </>
      )}
    </Button>
  )
}

export function DatePickerHeaderTitle(props: ParentProps<JSX.HTMLAttributes<HTMLDivElement>>) {
  const [local, rest] = splitProps(props, ['class', 'children'])
  return (
    <div {...rest} class={cn(datePickerHeaderTitleClassName, local.class)}>
      {local.children}
    </div>
  )
}

export interface DatePickerHeaderLabelProps extends ButtonProps {
  part: 'year' | 'month'
}

export function DatePickerHeaderLabel(props: DatePickerHeaderLabelProps) {
  const [local, rest] = splitProps(props, ['part', 'class', 'children', 'onClick'])
  const calendar = useCalendarContext('DatePickerHeaderLabel')
  const label = () => {
    if (local.part === 'year') {
      return calendar.state().panel === 'decade'
        ? `${Math.floor(calendar.state().viewDate.year / 10) * 10}-${Math.floor(calendar.state().viewDate.year / 10) * 10 + 9}年`
        : `${calendar.state().viewDate.year}年`
    }
    return `${calendar.state().viewDate.month}月`
  }
  return (
    <Button
      {...rest}
      type="button"
      variant={rest.variant ?? 'ghost'}
      size={rest.size ?? 'sm'}
      class={cn(datePickerHeaderLabelClassName, local.class)}
      onClick={(event) => {
        if (typeof local.onClick === 'function') local.onClick(event)
        if (!event.defaultPrevented) calendar.controller.setPanel(getNextPanelByHeaderLabel(local.part))
      }}
    >
      {local.children ?? label()}
    </Button>
  )
}
