<script lang="ts">
import { RangePickerRoot, RangePickerTrigger, RangePickerContent, RangePickerPanelGroup, DatePickerFooter } from '@fex-design/svelte/primitive/date-picker'
import { Button } from '@fex-design/svelte/ui/button'
import type { CalendarRange } from '@fex-design/core/calendar'
import { createCalendarDate } from '@fex-design/core/calendar/temporal'
const initialValue: CalendarRange = { start: createCalendarDate(2026, 10, 15), end: createCalendarDate(2026, 10, 22) }
const novemberValue: CalendarRange = { start: createCalendarDate(2026, 11, 5), end: createCalendarDate(2026, 11, 12) }
let value = $state<CalendarRange>(initialValue)
let open = $state<boolean>(false)
let uncontrolledValue = $state<CalendarRange>(initialValue)
function setNovember() { value = novemberValue }
function resetValue() { value = initialValue }
function clearValue() { value = {} }
function openPanel() { open = true }
function closePanel() { open = false }
</script>
<div class="flex w-full min-w-0 flex-col gap-6">
<div class="flex flex-wrap gap-2">
<Button onclick={() => setNovember()}>设置 11 月范围</Button>
<Button onclick={() => resetValue()}>恢复初始范围</Button>
<Button onclick={() => clearValue()}>清空外部值</Button>
<Button onclick={() => openPanel()}>打开受控面板</Button>
<Button onclick={() => closePanel()}>关闭受控面板</Button>
</div>
<section class="flex w-full min-w-0 flex-col gap-2">
<p class="text-sm font-medium">受控：value / open</p>
<p class="text-sm text-muted-foreground">外部按钮可设置、清空选择值，也可控制面板开关。</p>
<RangePickerRoot value={value} open={open} onChange={next => value = next} onOpenChange={next => open = next}>
<RangePickerTrigger />
<RangePickerContent>
<RangePickerPanelGroup />
<DatePickerFooter />
</RangePickerContent>
</RangePickerRoot>
<output class="text-sm text-muted-foreground">外部值：{value.start?.toString() ?? '未选择'} → {value.end?.toString() ?? '未选择'}；面板：{open ? '打开' : '关闭'}</output>
</section>
<section class="flex w-full min-w-0 flex-col gap-2">
<p class="text-sm font-medium">非受控：defaultValue</p>
<p class="text-sm text-muted-foreground">defaultValue 仅初始化读取；上方按钮更新外部值后，这里的选择保持不变。</p>
<RangePickerRoot defaultValue={value} onChange={next => uncontrolledValue = next}>
<RangePickerTrigger />
<RangePickerContent>
<RangePickerPanelGroup />
<DatePickerFooter />
</RangePickerContent>
</RangePickerRoot>
<output class="text-sm text-muted-foreground">选择结果：{uncontrolledValue.start?.toString() ?? '未选择'} → {uncontrolledValue.end?.toString() ?? '未选择'}</output>
</section>
</div>
