<script setup lang="ts">
import { inject, computed, useAttrs, normalizeClass } from 'vue'
import { cn } from '@fex-design/utils'
import { getDatePickerTimeColumns } from '@fex-design/core/date-picker/time'
import { datePickerTimePanelClassName } from '@fex-design/components-styles/date-picker'
import {
  TimePickerRoot,
  TimePickerPanel,
  TimePickerHourColumn,
  TimePickerMinuteColumn,
  TimePickerSecondColumn,
  TimePickerPeriodColumn,
} from '@fex-design/vue/primitive/time-picker'
import { datePickerContextKey, rangePickerContextKey } from './context'
defineOptions({ name: 'DatePickerTimePanel', inheritAttrs: false })
const props = defineProps<{ range?: boolean }>()
const attrs = useAttrs()
const single = inject(datePickerContextKey, null)
const interval = inject(rangePickerContextKey, null)
const owner = computed(() => (props.range ? interval : single))
const columns = computed(() =>
  owner.value ? getDatePickerTimeColumns(owner.value.timeOptions) : [],
)
</script>
<template>
  <div
    v-if="owner?.showTime"
    v-bind="attrs"
    data-slot="date-picker-time-panel"
    :class="cn(datePickerTimePanelClassName, normalizeClass(attrs.class))"
  >
    <TimePickerRoot
      :value="owner.timeValue.value"
      :format="owner.timeOptions.format"
      :use12-hours="owner.timeOptions.use12Hours"
      :disabled="owner.disabled"
      :disabled-time="owner.timeOptions.disabledTime"
      @change="owner.selectTime"
    >
      <TimePickerPanel
        ><template v-for="column in columns" :key="column.unit">
          <TimePickerHourColumn
            v-if="column.unit === 'hour'"
            :step="owner.timeOptions.step?.hour"
          />
          <TimePickerMinuteColumn
            v-else-if="column.unit === 'minute'"
            :step="owner.timeOptions.step?.minute"
          />
          <TimePickerSecondColumn
            v-else-if="column.unit === 'second'"
            :step="owner.timeOptions.step?.second"
          />
          <TimePickerPeriodColumn v-else /> </template
      ></TimePickerPanel>
    </TimePickerRoot>
  </div>
</template>
