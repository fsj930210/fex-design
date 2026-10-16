import { datePickerHeaderTitleClassName } from '@fex-design/components-styles/date-picker'
import { cn } from '@fex-design/utils'
import { splitProps, type JSX, type ParentProps } from 'solid-js'

export function DatePickerHeaderTitle(props: ParentProps<JSX.HTMLAttributes<HTMLDivElement>>) {
  const [local, rest] = splitProps(props, ['class', 'children'])
  return (
    <div {...rest} class={cn(datePickerHeaderTitleClassName, local.class)}>
      {local.children}
    </div>
  )
}

export type DatePickerHeaderTitleProps = ParentProps<JSX.HTMLAttributes<HTMLDivElement>>
