<script setup lang="ts">
import { DatePicker, createDatePickerDateTime } from '@fex-design/vue/ui/date-picker'
import type { DatePickerSelectionValue } from '@fex-design/vue/primitive/date-picker'
import { Button } from '@fex-design/vue/ui/button'
import { ref } from 'vue'
defineOptions({ name: 'DatePickerDateTimeControlledExample' })
const initial = createDatePickerDateTime(2026, 10, 15, 9, 30, 0)
const value = ref<DatePickerSelectionValue>(initial)
const open = ref(false)
</script>
<template>
<div class="flex w-full min-w-0 flex-col gap-6">
<div class="flex flex-wrap gap-2"><Button @click="value = createDatePickerDateTime(2026, 10, 16, 14, 45, 30)">外部设置 10-16 14:45:30</Button><Button @click="value = null">清空</Button><Button @click="open = true">打开</Button><Button @click="open = false">关闭</Button></div>
<DatePicker :show-time="true" :value="value" :open="open" @change="next => value = next" @open-change="next => open = next" />
<output class="text-sm text-muted-foreground">已提交值：{{ value?.toString() ?? '未选择' }}</output>
</div>
</template>
