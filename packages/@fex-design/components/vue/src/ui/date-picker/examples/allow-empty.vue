<script setup lang="ts">
import { RangePicker } from '@fex-design/vue/ui/date-picker'
defineOptions({ name: 'DatePickerAllowEmptyExample' })

</script>
<template>
<div class="flex w-full min-w-0 flex-col gap-4">
<section class="flex w-full min-w-0 flex-col gap-2">
<p class="text-sm font-medium">结束日期可留空</p>
<RangePicker :allow-empty="{ end: true }" :need-confirm="true" :end-input-props="{ placeholder: '至今' }" />
</section>
<section class="flex w-full min-w-0 flex-col gap-2">
<p class="text-sm font-medium">开始日期可留空</p>
<RangePicker :allow-empty="{ start: true }" :need-confirm="true" :start-input-props="{ placeholder: '不限开始' }" />
</section>
</div>
</template>
