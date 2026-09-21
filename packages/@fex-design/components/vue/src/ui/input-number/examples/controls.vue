<script setup lang="ts">
import { InputNumber } from '@fex-design/vue/ui/input-number'
</script>
<template>
  <div class="grid w-full gap-2">
    <p>默认控制与隐藏控制</p>
    <InputNumber :default-value="8" /><InputNumber :default-value="8" :controls="false" />
  </div>
</template>
