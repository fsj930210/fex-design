<script setup lang="ts">
import { ref } from 'vue'
import { format } from '@fex-design/core/date/utils'
import type { TimeRangeValue } from '@fex-design/vue/primitive/time-picker'
import { TimeRangePicker } from '@fex-design/vue/ui/time-picker'
defineOptions({ name: 'TimePickerRangeExample' })
const initial: TimeRangeValue = [
  { hour: 9, minute: 30, second: 0 },
  { hour: 17, minute: 30, second: 0 },
]
const display = (value: TimeRangeValue | null) =>
  value ? `${format(value[0], 'HH:mm:ss')} → ${format(value[1], 'HH:mm:ss')}` : '未选择'
const confirmed = ref<TimeRangeValue | null>(initial)
const immediate = ref<TimeRangeValue | null>(initial)
</script>
<template>
  <div class="grid w-full gap-6">
    <section class="grid gap-2">
      <p>默认确认后提交</p>
      <TimeRangePicker :default-value="initial" @change="(value) => (confirmed = value)" /><output
        aria-live="polite"
        >已提交：{{ display(confirmed) }}</output
      >
    </section>
    <section class="grid gap-2">
      <p>关闭确认，完整有效区间即时提交</p>
      <TimeRangePicker
        :default-value="initial"
        :need-confirm="false"
        @change="(value) => (immediate = value)"
      /><output aria-live="polite">已提交：{{ display(immediate) }}</output>
    </section>
  </div>
</template>
