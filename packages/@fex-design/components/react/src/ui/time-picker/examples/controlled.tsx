import { TimePicker } from '@fex-design/react/ui/time-picker'
import type { TimeValue } from '@fex-design/react/primitive/time-picker'
import { Button } from '@fex-design/react/ui/button'
import { useState } from 'react'
import { format } from '@fex-design/core/date/utils'

const initialValue: TimeValue = { hour: 9, minute: 30, second: 0 }
const afternoonValue: TimeValue = { hour: 14, minute: 45, second: 30 }
const formatValue = (value: TimeValue | null) => value ? format(value, 'HH:mm:ss') : '未选择'

export function TimePickerControlledExample() {
  const [value, setValue] = useState<TimeValue | null>(initialValue)
  const [open, setOpen] = useState(false)
  const [uncontrolledValue, setUncontrolledValue] = useState<TimeValue | null>(initialValue)
  return (
    <div className="flex w-full min-w-0 flex-col gap-6">
    <div className="flex flex-wrap gap-2">
      <Button onClick={() => setValue(afternoonValue)}>设置 14:45:30</Button>
      <Button onClick={() => setValue(initialValue)}>恢复初始时间</Button>
      <Button onClick={() => setValue(null)}>清空外部值</Button>
      <Button onClick={() => setOpen(true)}>打开受控面板</Button>
      <Button onClick={() => setOpen(false)}>关闭受控面板</Button>
    </div>
    <section className="flex w-full min-w-0 flex-col gap-2">
      <p className="text-sm font-medium">受控：value / open</p>
      <p className="text-sm text-muted-foreground">外部按钮设置、清空时间，并控制面板开关。</p>
      <TimePicker value={value} open={open} onChange={setValue} onOpenChange={setOpen} />
      <output className="text-sm text-muted-foreground">外部值：{formatValue(value)}；面板：{open ? '打开' : '关闭'}</output>
    </section>
    <section className="flex w-full min-w-0 flex-col gap-2">
      <p className="text-sm font-medium">非受控：defaultValue</p>
      <p className="text-sm text-muted-foreground">defaultValue 仅初始化读取；上方外部值变化不会覆盖这里的选择。</p>
      <TimePicker defaultValue={value} onChange={setUncontrolledValue} />
      <output className="text-sm text-muted-foreground">选择结果：{formatValue(uncontrolledValue)}</output>
    </section>
  </div>
  )
}
