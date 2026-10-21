<script setup lang="ts">
import { TimePicker } from '@fex-design/vue/ui/time-picker'
defineOptions({ name: 'TimePickerAffixesExample' })
</script>
<template>
  <div class="flex w-full min-w-0 flex-col gap-4">
    <section class="grid gap-2">
      <p>默认时钟后缀</p>
      <TimePicker :default-value="{ hour: 9, minute: 30, second: 0 }"></TimePicker>
    </section>
    <section class="grid gap-2">
      <p>自定义前缀与后缀</p>
      <TimePicker :default-value="{ hour: 9, minute: 30, second: 0 }"
        ><template #prefix>预约</template><template #suffix>时</template></TimePicker
      >
    </section>
    <section class="grid gap-2">
      <p>自定义时区后缀</p>
      <TimePicker :default-value="{ hour: 9, minute: 30, second: 0 }"
        ><template #prefix>时间</template><template #suffix>UTC</template></TimePicker
      >
    </section>
  </div>
</template>
