<script setup lang="ts">
import { DatePicker, RangePicker } from '@fex-design/vue/ui/date-picker'
defineOptions({ name: 'DatePickerSizesExample' })

</script>
<template>
<div class="flex w-full min-w-0 flex-col gap-4">
<section class="flex w-full min-w-0 flex-col gap-2">
<p class="text-sm font-medium">sm</p>
<DatePicker :input-props="{ size: 'sm' }" />
<RangePicker :input-props="{ size: 'sm' }" />
</section>
<section class="flex w-full min-w-0 flex-col gap-2">
<p class="text-sm font-medium">md</p>
<DatePicker :input-props="{ size: 'md' }" />
<RangePicker :input-props="{ size: 'md' }" />
</section>
<section class="flex w-full min-w-0 flex-col gap-2">
<p class="text-sm font-medium">lg</p>
<DatePicker :input-props="{ size: 'lg' }" />
<RangePicker :input-props="{ size: 'lg' }" />
</section>
</div>
</template>
