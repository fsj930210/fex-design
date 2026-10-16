import { datePickerHeaderClassName } from '@fex-design/components-styles/date-picker'
import { cn } from '@fex-design/utils'
import { splitProps, type JSX, type ParentProps } from 'solid-js'

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

export type DatePickerHeaderProps = ParentProps<JSX.HTMLAttributes<HTMLDivElement>>
