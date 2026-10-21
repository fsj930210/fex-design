import { getTimePickerDirection } from '@fex-design/core/time-picker/scroll'
import { usePopoverContext } from '../popover/popover-context'
import { cn } from '@fex-design/utils'
import type { ComponentProps } from 'react'
import { PopoverContent } from '../popover'

export interface TimePickerContentProps extends ComponentProps<typeof PopoverContent> {}

export function TimePickerContent({ className, style, ...props }: TimePickerContentProps) {
  const { triggerRef } = usePopoverContext('TimePickerContent')
  return (
    <PopoverContent
      {...props}
      dir={props.dir ?? getTimePickerDirection(triggerRef.current)}
      className={cn('overflow-hidden p-0', className)}
      style={{
        width: 'var(--floating-reference-width)',
        maxWidth: 'var(--floating-available-width)',
        maxHeight: 'var(--floating-available-height)',
        ...style,
      }}
    />
  )
}
