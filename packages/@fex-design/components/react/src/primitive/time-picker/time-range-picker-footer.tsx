import type { ComponentProps } from 'react'
import { Button } from '../button'
import { useTimeRangePickerContext } from './time-range-picker-context'

export interface TimeRangePickerFooterProps {
  cancelButtonProps?:
    | Omit<ComponentProps<typeof Button>, 'children' | 'type' | 'disabled' | 'onClick'>
    | undefined
  confirmButtonProps?:
    | Omit<ComponentProps<typeof Button>, 'children' | 'type' | 'disabled' | 'onClick'>
    | undefined
}

export function TimeRangePickerFooter({
  cancelButtonProps,
  confirmButtonProps,
}: TimeRangePickerFooterProps = {}) {
  const range = useTimeRangePickerContext()
  const canConfirm = () => {
    range.snapshot
    return range.controller.canConfirm()
  }
  if (range.options.needConfirm === false) return null
  return (
    <div
      data-slot="time-range-picker-footer"
      className="flex justify-end gap-2 border-t border-border p-2"
    >
      <Button
        variant="text"
        {...cancelButtonProps}
        type="button"
        disabled={false}
        onClick={() => range.controller.cancel()}
      >
        取消
      </Button>
      <Button
        color="primary"
        variant="solid"
        {...confirmButtonProps}
        type="button"
        disabled={!canConfirm()}
        onClick={() => range.controller.confirm()}
      >
        确定
      </Button>
    </div>
  )
}
