<script setup lang="ts">
import { ref } from 'vue'
import { RangePicker } from '@fex-design/vue/ui/date-picker'
import { Button } from '@fex-design/vue/ui/button'
import type { CalendarRange } from '@fex-design/core/calendar'
import { createCalendarDate } from '@fex-design/core/calendar/temporal'
defineOptions({ name: 'DatePickerControlledExample' })
const initialValue: CalendarRange = {
  start: createCalendarDate(2026, 10, 15),
  end: createCalendarDate(2026, 10, 22),
}
const novemberValue: CalendarRange = {
  start: createCalendarDate(2026, 11, 5),
  end: createCalendarDate(2026, 11, 12),
}
const value = ref<CalendarRange>(initialValue)
const open = ref<boolean>(false)
const uncontrolledValue = ref<CalendarRange>(initialValue)
function setNovember() {
  value.value = novemberValue
}
function resetValue() {
  value.value = initialValue
}
function clearValue() {
  value.value = {}
}
function openPanel() {
  open.value = true
}
function closePanel() {
  open.value = false
}
</script>
<template>
  <div class="flex w-full min-w-0 flex-col gap-6">
    <div class="flex flex-wrap gap-2">
      <Button @click="setNovember()">设置 11 月范围</Button>
      <Button @click="resetValue()">恢复初始范围</Button>
      <Button @click="clearValue()">清空外部值</Button>
      <Button @click="openPanel()">打开受控面板</Button>
      <Button @click="closePanel()">关闭受控面板</Button>
    </div>
    <section class="flex w-full min-w-0 flex-col gap-2">
      <p class="text-sm font-medium">受控：value / open</p>
      <p class="text-sm text-muted-foreground">外部按钮可设置、清空选择值，也可控制面板开关。</p>
      <RangePicker v-model:value="value" v-model:open="open" />
      <output class="text-sm text-muted-foreground"
        >外部值：{{ value.start?.toString() ?? '未选择' }} →
        {{ value.end?.toString() ?? '未选择' }}；面板：{{ open ? '打开' : '关闭' }}</output
      >
    </section>
    <section class="flex w-full min-w-0 flex-col gap-2">
      <p class="text-sm font-medium">非受控：defaultValue</p>
      <p class="text-sm text-muted-foreground">
        defaultValue 仅初始化读取；上方按钮更新外部值后，这里的选择保持不变。
      </p>
      <RangePicker :default-value="value" @change="uncontrolledValue = $event" />
      <output class="text-sm text-muted-foreground"
        >选择结果：{{ uncontrolledValue.start?.toString() ?? '未选择' }} →
        {{ uncontrolledValue.end?.toString() ?? '未选择' }}</output
      >
    </section>
  </div>
</template>
