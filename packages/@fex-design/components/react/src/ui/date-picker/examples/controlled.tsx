import { useState } from 'react'
import { RangePicker } from '@fex-design/react/ui/date-picker'
import { Button } from '@fex-design/react/ui/button'
import type { CalendarRange } from '@fex-design/core/calendar'
import { createCalendarDate } from '@fex-design/core/calendar/temporal'

const initialValue: CalendarRange = { start: createCalendarDate(2026, 10, 15), end: createCalendarDate(2026, 10, 22) }
const novemberValue: CalendarRange = { start: createCalendarDate(2026, 11, 5), end: createCalendarDate(2026, 11, 12) }

export function DatePickerControlledExample() {
const [value, setValue] = useState<CalendarRange>(initialValue)
const [open, setOpen] = useState<boolean>(false)
const [uncontrolledValue, setUncontrolledValue] = useState<CalendarRange>(initialValue)
function setNovember() { setValue(novemberValue) }
function resetValue() { setValue(initialValue) }
function clearValue() { setValue({}) }
function openPanel() { setOpen(true) }
function closePanel() { setOpen(false) }
return (
<div className="flex w-full min-w-0 flex-col gap-6">
<div className="flex flex-wrap gap-2">
<Button onClick={() => setNovember()}>设置 11 月范围</Button>
<Button onClick={() => resetValue()}>恢复初始范围</Button>
<Button onClick={() => clearValue()}>清空外部值</Button>
<Button onClick={() => openPanel()}>打开受控面板</Button>
<Button onClick={() => closePanel()}>关闭受控面板</Button>
</div>
<section className="flex w-full min-w-0 flex-col gap-2">
<p className="text-sm font-medium">受控：value / open</p>
<p className="text-sm text-muted-foreground">外部按钮可设置、清空选择值，也可控制面板开关。</p>
<RangePicker value={value} open={open} onChange={setValue} onOpenChange={setOpen} />
<output className="text-sm text-muted-foreground">外部值：{value.start?.toString() ?? '未选择'} → {value.end?.toString() ?? '未选择'}；面板：{open ? '打开' : '关闭'}</output>
</section>
<section className="flex w-full min-w-0 flex-col gap-2">
<p className="text-sm font-medium">非受控：defaultValue</p>
<p className="text-sm text-muted-foreground">defaultValue 仅初始化读取；上方按钮更新外部值后，这里的选择保持不变。</p>
<RangePicker defaultValue={value} onChange={setUncontrolledValue} />
<output className="text-sm text-muted-foreground">选择结果：{uncontrolledValue.start?.toString() ?? '未选择'} → {uncontrolledValue.end?.toString() ?? '未选择'}</output>
</section>
</div>
)
}
