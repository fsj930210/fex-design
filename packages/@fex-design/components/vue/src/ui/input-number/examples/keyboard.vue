<script setup lang="ts">
import { InputNumber } from '@fex-design/vue/ui/input-number'
</script>
<template>
  <div class="grid w-full gap-2">
    <p>ArrowUp 增加，ArrowDown 减少</p>
    <InputNumber :default-value="8" />
  </div>
</template>
