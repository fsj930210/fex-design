<script setup lang="ts">
import { Input } from '@fex-design/vue/ui/input'
</script>
<template>
  <div class="grid w-full gap-3">
    <Input disabled default-value="禁用" /><Input readonly default-value="只读" /><Input
      aria-invalid="true"
      default-value="输入有误"
    />
  </div>
</template>
