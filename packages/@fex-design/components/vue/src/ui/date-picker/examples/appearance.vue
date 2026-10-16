<script setup lang="ts">
import { DatePicker, RangePicker } from '@fex-design/vue/ui/date-picker'
defineOptions({ name: 'DatePickerAppearanceExample' })

</script>
<template>
<div class="flex w-full min-w-0 flex-col gap-4">
<section class="flex w-full min-w-0 flex-col gap-2">
<p class="text-sm font-medium">outlined</p>
<DatePicker :input-props="{ variant: 'outlined' }" />
<RangePicker :input-props="{ variant: 'outlined' }" />
</section>
<section class="flex w-full min-w-0 flex-col gap-2">
<p class="text-sm font-medium">filled</p>
<DatePicker :input-props="{ variant: 'filled' }" />
<RangePicker :input-props="{ variant: 'filled' }" />
</section>
<section class="flex w-full min-w-0 flex-col gap-2">
<p class="text-sm font-medium">borderless</p>
<DatePicker :input-props="{ variant: 'borderless' }" />
<RangePicker :input-props="{ variant: 'borderless' }" />
</section>
<section class="flex w-full min-w-0 flex-col gap-2">
<p class="text-sm font-medium">underlined</p>
<DatePicker :input-props="{ variant: 'underlined' }" />
<RangePicker :input-props="{ variant: 'underlined' }" />
</section>
</div>
</template>
