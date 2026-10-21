import { usePickerAppearance } from './appearance-context'
import { mergeStyle } from '@fex-design/solid/primitives/merge-style'
import { PickerContainerContext } from './container-context'
import { splitProps, useContext, type ParentProps } from 'solid-js'
import { cn } from '@fex-design/utils'
import { datePickerContentClassName } from '@fex-design/components-styles/date-picker'
import { PopoverContent, PopoverPortal, type PopoverContentProps } from '../popover'
import { PopoverContext } from '../popover/popover-context'
export type DatePickerContentProps = ParentProps<PopoverContentProps>
export function DatePickerContent(props: DatePickerContentProps) {
  const [local, rest] = splitProps(props, ['class', 'style', 'children'])
  const inheritedPopover = useContext(PopoverContext)
  const appearance = usePickerAppearance()
  const containerScope = useContext(PickerContainerContext)
  const popover =
    containerScope && inheritedPopover === containerScope.parentPopover
      ? undefined
      : inheritedPopover
  return popover ? (
    <PopoverPortal>
      <PopoverContent
        {...rest}
        data-slot="date-picker-content"
        class={cn(
          datePickerContentClassName,
          appearance().popoverProps?.classNames?.root,
          local.class,
        )}
        style={mergeStyle(appearance().popoverProps?.styles?.root, local.style)}
      >
        {local.children}
      </PopoverContent>
    </PopoverPortal>
  ) : (
    <div
      {...rest}
      data-slot="date-picker-content"
      class={cn(
        datePickerContentClassName,
        appearance().popoverProps?.classNames?.root,
        local.class,
      )}
      style={mergeStyle(appearance().popoverProps?.styles?.root, local.style)}
    >
      {local.children}
    </div>
  )
}
export const RangePickerContent = DatePickerContent
