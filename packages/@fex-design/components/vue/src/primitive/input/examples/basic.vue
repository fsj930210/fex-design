<script setup lang="ts">
import { InputClear, InputControl, InputRoot } from '@fex-design/vue/primitive/input'
const props = defineProps<{ invalid?: boolean }>()
</script>
<template>
  <div class="grid w-full gap-3">
    <InputRoot :aria-invalid="props.invalid || undefined"
      ><InputControl placeholder="请输入内容" /></InputRoot
    ><InputRoot :aria-invalid="props.invalid || undefined" default-value="可清除内容"
      ><InputControl /><InputClear
    /></InputRoot>
  </div>
</template>
