<script setup lang="ts">
import { TimePickerRoot, TimePickerTrigger, TimePickerPortal, TimePickerContent, TimePickerPanel, TimePickerHourColumn, TimePickerMinuteColumn, TimePickerSecondColumn, TimePickerPeriodColumn } from '@fex-design/vue/primitive/time-picker'
import { analyzeTimeFormat } from '@fex-design/core/date/utils'
defineOptions({ name: 'TimePickerFormatExample' })
const formats = [
  { format: 'HH:mm:ss', use12Hours: false, label: '时、分、秒：3 列', stepped: false },
  { format: 'HH:mm', use12Hours: false, label: '时、分：2 列', stepped: false },
  { format: 'mm:ss', use12Hours: false, label: '分、秒：2 列', stepped: false },
  { format: 'HH', use12Hours: false, label: '仅小时：1 列', stepped: false },
  { format: 'hh:mm A', use12Hours: true, label: '12 小时：时、分、时段，共 3 列', stepped: false },
  { format: 'hh:mm:ss A', use12Hours: true, label: '12 小时：4 列，时/分/秒步长为 2/5/10', stepped: true },
].map(item => ({ ...item, columns: analyzeTimeFormat(item.format, item.use12Hours).columns }))
</script>
<template>
<div class="flex w-full min-w-0 flex-col gap-4">
  <section v-for="item in formats" :key="item.format" class="flex w-full min-w-0 flex-col gap-2">
    <p class="text-sm text-muted-foreground">{{ item.format }} — {{ item.label }}</p>
    <TimePickerRoot :format="item.format" :use12-hours="item.use12Hours" :default-value="{ hour: 9, minute: 30, second: 0 }">
        <TimePickerTrigger />
        <TimePickerPortal><TimePickerContent><TimePickerPanel>
          <template v-for="column in item.columns" :key="column.unit">
            <TimePickerHourColumn v-if="column.unit === 'hour'" :step="item.stepped ? 2 : 1" />
            <TimePickerMinuteColumn v-else-if="column.unit === 'minute'" :step="item.stepped ? 5 : 1" />
            <TimePickerSecondColumn v-else-if="column.unit === 'second'" :step="item.stepped ? 10 : 1" />
            <TimePickerPeriodColumn v-else />
          </template>
        </TimePickerPanel></TimePickerContent></TimePickerPortal>
      </TimePickerRoot>
  </section>
</div>
</template>
