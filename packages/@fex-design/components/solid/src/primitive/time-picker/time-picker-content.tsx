import { timePickerRootClassName } from '@fex-design/components-styles/time-picker'
import { cn } from '@fex-design/utils'
import type { JSX, ParentProps } from 'solid-js'
import { PopoverContent, PopoverPortal } from '../popover'

export interface TimePickerContentProps extends ParentProps<{ class?: string; style?: string }> {}

export function TimePickerContent(props: TimePickerContentProps) {
  return (
    <PopoverPortal>
      <PopoverContent
        {...props}
        class={cn('overflow-hidden p-0', props.class)}
        style={`width:var(--floating-reference-width);max-width:var(--floating-available-width);max-height:var(--floating-available-height);${props.style ?? ''}`}
      />
    </PopoverPortal>
  )
}

export function TimePickerPanel(props: ParentProps<JSX.HTMLAttributes<HTMLDivElement>>) {
  return (
    <div {...props} data-slot="time-picker-panel" class={cn(timePickerRootClassName, props.class)}>
      {props.children}
    </div>
  )
}
