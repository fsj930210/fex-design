<script setup lang="ts">
import { computed } from 'vue'
import { Button } from '../button'
import { useTimeRangePickerContext } from './time-range-picker-context'
defineOptions({ name: 'TimeRangePickerFooter' })
defineProps<{
  cancelButtonProps?:
    | Omit<InstanceType<typeof Button>['$props'], 'type' | 'disabled' | 'onClick'>
    | undefined
  confirmButtonProps?:
    | Omit<InstanceType<typeof Button>['$props'], 'type' | 'disabled' | 'onClick'>
    | undefined
}>()
const { controller, snapshot, options } = useTimeRangePickerContext()
const canConfirm = computed(() => {
  snapshot.value
  return controller.canConfirm()
})
</script>
<template>
  <div
    v-if="options.needConfirm !== false"
    data-slot="time-range-picker-footer"
    class="flex justify-end gap-2 border-t border-border p-2"
  >
    <Button
      variant="text"
      v-bind="{ ...cancelButtonProps, onClick: undefined }"
      type="button"
      :disabled="false"
      @click="controller.cancel()"
      >取消</Button
    >
    <Button
      color="primary"
      variant="solid"
      v-bind="{ ...confirmButtonProps, onClick: undefined }"
      type="button"
      :disabled="!canConfirm"
      @click="controller.confirm()"
      >确定</Button
    >
  </div>
</template>
