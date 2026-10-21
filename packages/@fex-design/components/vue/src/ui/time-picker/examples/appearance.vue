<script setup lang="ts">
import { TimePicker } from '@fex-design/vue/ui/time-picker'
defineOptions({ name: 'TimePickerAppearanceExample' })
</script>
<template>
  <div class="flex w-full min-w-0 flex-col gap-4">
    <section class="flex flex-col gap-2">
      <p>outlined</p>
      <TimePicker
        :default-value="{ hour: 9, minute: 30, second: 0 }"
        variant="outlined"
      ></TimePicker>
    </section>
    <section class="flex flex-col gap-2">
      <p>filled</p>
      <TimePicker :default-value="{ hour: 9, minute: 30, second: 0 }" variant="filled"></TimePicker>
    </section>
    <section class="flex flex-col gap-2">
      <p>borderless</p>
      <TimePicker
        :default-value="{ hour: 9, minute: 30, second: 0 }"
        variant="borderless"
      ></TimePicker>
    </section>
    <section class="flex flex-col gap-2">
      <p>underlined</p>
      <TimePicker
        :default-value="{ hour: 9, minute: 30, second: 0 }"
        variant="underlined"
      ></TimePicker>
    </section>
  </div>
</template>
