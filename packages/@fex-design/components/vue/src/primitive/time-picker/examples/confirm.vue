<script setup lang="ts">
import { Button } from '@fex-design/vue/primitive/button'
import { ref } from 'vue'
import type { TimeValue } from '@fex-design/vue/primitive/time-picker'
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
} from '@fex-design/vue/primitive/time-picker'
defineOptions({ name: 'TimePickerConfirmExample' })
const committed = ref<TimeValue | null>({ hour: 9, minute: 30, second: 0 })
const draft = ref<TimeValue | null>({ hour: 9, minute: 30, second: 0 })
const open = ref(false)
function changeOpen(next: boolean) {
  open.value = next
  if (!next) draft.value = committed.value
}
function confirm() {
  committed.value = draft.value
  open.value = false
}
</script>
<template>
  <div class="grid w-full gap-4">
    <p>调用方通过受控值保存待确认选择；确认后提交，取消或关闭恢复。</p>
    <TimePickerRoot
      :value="draft"
      :open="open"
      @change="(next) => (draft = next)"
      @open-change="changeOpen"
      ><TimePickerTrigger></TimePickerTrigger
      ><TimePickerPortal
        ><TimePickerContent
          ><TimePickerPanel
            ><TimePickerHourColumn></TimePickerHourColumn
            ><TimePickerMinuteColumn /><TimePickerSecondColumn
          /></TimePickerPanel>
          <div class="flex flex-wrap justify-end gap-2 border-t border-border p-2">
            <Button type="button" size="sm" variant="text" @click="changeOpen(false)">取消</Button
            ><Button type="button" size="sm" color="primary" variant="solid" @click="confirm"
              >确认</Button
            >
          </div></TimePickerContent
        ></TimePickerPortal
      ></TimePickerRoot
    ><output aria-live="polite"
      >已确认：{{ committed ? format(committed, 'HH:mm:ss') : '未选择' }}</output
    >
  </div>
</template>
