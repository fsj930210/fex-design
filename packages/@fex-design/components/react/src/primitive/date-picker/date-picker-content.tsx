import { usePickerAppearance } from './appearance-context'
import { PickerContainerContext } from './container-context'
import { use, type ComponentProps } from 'react'
import { cn } from '@fex-design/utils'
import { datePickerContentClassName } from '@fex-design/components-styles/date-picker'
import { PopoverContent, PopoverPortal } from '../popover'
import { PopoverContext } from '../popover/popover-context'
export type DatePickerContentProps = ComponentProps<typeof PopoverContent>
export function DatePickerContent({ className, style, ...props }: DatePickerContentProps) {
  const appearance = usePickerAppearance()
  const popup = appearance.popoverProps
  const containerScope = use(PickerContainerContext)
  const inheritedPopover = use(PopoverContext)
  const popover = containerScope && inheritedPopover === containerScope.parentPopover ? null : inheritedPopover
  const classes = cn(datePickerContentClassName, popup?.classNames?.root, className)
  return popover ? <PopoverPortal><PopoverContent {...props} data-slot="date-picker-content" className={classes} style={{ ...popup?.styles?.root, ...style }} /></PopoverPortal> : <div {...props} data-slot="date-picker-content" className={classes} />
}
export const RangePickerContent = DatePickerContent
