import type { ComponentProps } from 'solid-js'
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

export function TimeRangePickerFooter(props: TimeRangePickerFooterProps = {}) {
  const range = useTimeRangePickerContext()
  const canConfirm = () => {
    range.snapshot()
    return range.controller.canConfirm()
  }

  return (
    <>
      {range.options.needConfirm !== false && (
        <div
          data-slot="time-range-picker-footer"
          class="flex justify-end gap-2 border-t border-border p-2"
        >
          <Button
            variant="text"
            {...props.cancelButtonProps}
            type="button"
            disabled={false}
            onClick={() => range.controller.cancel()}
          >
            取消
          </Button>
          <Button
            color="primary"
            variant="solid"
            {...props.confirmButtonProps}
            type="button"
            disabled={!canConfirm()}
            onClick={() => range.controller.confirm()}
          >
            确定
          </Button>
        </div>
      )}
    </>
  )
}
