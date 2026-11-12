<script setup lang="ts">
const props = defineProps<{ invalid?: boolean }>()
import { Checkbox, CheckboxGroup } from '@fex-design/vue/ui/checkbox'
</script>

<template>
  <div class="grid gap-3">
    <Checkbox :aria-invalid="props.invalid || undefined" :aria-invalid="props.invalid || undefined"
      >接收产品更新</Checkbox
    ><Checkbox :aria-invalid="props.invalid || undefined" default-checked>接收安全提醒</Checkbox>
  </div>
</template>
