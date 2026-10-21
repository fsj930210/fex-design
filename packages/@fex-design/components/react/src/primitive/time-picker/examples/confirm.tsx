import { Button } from '@fex-design/react/primitive/button'
import { useState } from 'react'
import type { TimeValue } from '@fex-design/react/primitive/time-picker'
import { format } from '@fex-design/core/date/utils'
import {
  TimePickerRoot,
  TimePickerTrigger,
  TimePickerPortal,
  TimePickerContent,
  TimePickerPanel,
  TimePickerHourColumn,
  TimePickerMinuteColumn,
  TimePickerSecondColumn,
  TimePickerPeriodColumn,
} from '@fex-design/react/primitive/time-picker'

export function TimePickerConfirmExample() {
  const [committed, setCommitted] = useState<TimeValue | null>({ hour: 9, minute: 30, second: 0 })
  const [draft, setDraft] = useState<TimeValue | null>({ hour: 9, minute: 30, second: 0 })
  const [open, setOpen] = useState(false)
  function changeOpen(next: boolean) {
    setOpen(next)
    if (!next) setDraft(committed)
  }
  function confirm() {
    setCommitted(draft)
    setOpen(false)
  }
  return (
    <div className="grid w-full gap-4">
      <p>调用方通过受控值保存待确认选择；确认后提交，取消或关闭恢复。</p>
      <TimePickerRoot value={draft} open={open} onChange={setDraft} onOpenChange={changeOpen}>
        <TimePickerTrigger></TimePickerTrigger>
        <TimePickerPortal>
          <TimePickerContent>
            <TimePickerPanel>
              <TimePickerHourColumn />
              <TimePickerMinuteColumn />
              <TimePickerSecondColumn />
            </TimePickerPanel>
            <div className="flex flex-wrap justify-end gap-2 border-t border-border p-2">
              <Button type="button" size="sm" variant="text" onClick={() => changeOpen(false)}>
                取消
              </Button>
              <Button type="button" size="sm" color="primary" variant="solid" onClick={confirm}>
                确认
              </Button>
            </div>
          </TimePickerContent>
        </TimePickerPortal>
      </TimePickerRoot>
      <output aria-live="polite">
        已确认：{committed ? format(committed, 'HH:mm:ss') : '未选择'}
      </output>
    </div>
  )
}
