<script setup lang="ts">
import { RangePicker } from '@fex-design/vue/ui/date-picker'

defineOptions({ name: 'DatePickerConfirmExample' })
</script>
<template>
  <div class="flex flex-wrap items-start gap-4">
    <RangePicker :need-confirm="true"> </RangePicker>
  </div>
</template>
