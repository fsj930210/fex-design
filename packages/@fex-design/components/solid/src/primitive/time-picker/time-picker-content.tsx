import { getTimePickerDirection } from '@fex-design/core/time-picker/scroll'
import { usePopover } from '../popover/popover-context'
import { cn } from '@fex-design/utils'
import type { ComponentProps } from 'solid-js'
import { PopoverContent } from '../popover'

export type TimePickerContentProps = ComponentProps<typeof PopoverContent>

export function TimePickerContent(props: TimePickerContentProps) {
  const { triggerElement } = usePopover('TimePickerContent')
  return (
      <PopoverContent
        {...props}
        dir={props.dir ?? getTimePickerDirection(triggerElement.current)}
        class={cn('overflow-hidden p-0', props.class)}
        style={typeof props.style === 'string' ? 'width:var(--floating-reference-width);max-width:var(--floating-available-width);max-height:var(--floating-available-height);' + props.style : { width: 'var(--floating-reference-width)', 'max-width': 'var(--floating-available-width)', 'max-height': 'var(--floating-available-height)', ...props.style }}
      />
  )
}
