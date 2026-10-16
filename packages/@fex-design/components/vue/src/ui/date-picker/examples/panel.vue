<script setup lang="ts">
import { DatePicker } from '@fex-design/vue/ui/date-picker'

defineOptions({ name: 'DatePickerPanelExample' })

</script>
<template>
<div class="flex flex-wrap items-start gap-4">
  <DatePicker>
  <template #panel="{ panel, state }">
  <div>
  <p class="p-2 text-sm">自定义面板容器</p>
  <component :is="panel" />
  </div>
  </template>
  </DatePicker>
</div>
</template>
