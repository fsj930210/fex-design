import { Button } from '@fex-design/solid/primitive/button'
import { createSignal } from 'solid-js'
import type { TimeValue } from '@fex-design/solid/primitive/time-picker'
import { format } from '@fex-design/core/date/utils'
import { TimePicker } from '@fex-design/solid/ui/time-picker'

export function TimePickerConfirmExample() {
  const [committed, setCommitted] = createSignal<TimeValue | null>({
    hour: 9,
    minute: 30,
    second: 0,
  })
  const [draft, setDraft] = createSignal<TimeValue | null>({ hour: 9, minute: 30, second: 0 })
  const [open, setOpen] = createSignal(false)
  function changeOpen(next: boolean) {
    setOpen(next)
    if (!next) setDraft(committed())
  }
  function confirm() {
    setCommitted(draft())
    setOpen(false)
  }
  return (
    <div class="grid w-full gap-4">
      <p>调用方通过受控值保存待确认选择；确认后提交，取消或关闭恢复。</p>
      <TimePicker
        value={draft()}
        open={open()}
        onChange={setDraft}
        onOpenChange={changeOpen}
        footer={
          <div class="flex flex-wrap justify-end gap-2 border-t border-border p-2">
            <Button type="button" size="sm" variant="text" onClick={() => changeOpen(false)}>
              取消
            </Button>
            <Button type="button" size="sm" color="primary" variant="solid" onClick={confirm}>
              确认
            </Button>
          </div>
        }
      />
      <output aria-live="polite">
        已确认：{committed() ? format(committed()!, 'HH:mm:ss') : '未选择'}
      </output>
    </div>
  )
}
