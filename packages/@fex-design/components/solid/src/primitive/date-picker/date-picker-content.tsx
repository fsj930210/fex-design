import { datePickerContentClassName } from '@fex-design/components-styles/date-picker'
import { cn } from '@fex-design/utils'
import { splitProps, type ParentProps } from 'solid-js'
import { PopoverContent, PopoverPortal, type PopoverContentProps } from '../popover/popover'

export interface DatePickerContentProps extends ParentProps<PopoverContentProps> {}

export function DatePickerContent(props: DatePickerContentProps) {
  const [local, rest] = splitProps(props, ['class', 'children'])
  return (
    <PopoverPortal>
      <PopoverContent {...rest} class={cn(datePickerContentClassName, local.class)}>
        {local.children}
      </PopoverContent>
    </PopoverPortal>
  )
}

export const RangePickerContent = DatePickerContent
