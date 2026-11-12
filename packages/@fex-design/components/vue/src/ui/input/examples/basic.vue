<script setup lang="ts">
import { Input } from '@fex-design/vue/ui/input'
const props = defineProps<{ invalid?: boolean }>()
</script>
<template>
  <div class="grid w-full gap-3">
    <Input :aria-invalid="props.invalid || undefined" placeholder="请输入内容" /><Input
      :aria-invalid="props.invalid || undefined"
      default-value="可清除内容"
      clearable
    />
  </div>
</template>
