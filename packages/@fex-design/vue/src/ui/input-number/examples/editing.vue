<script setup lang="ts">
import { InputNumber } from '@fex-design/vue/ui/input-number'
</script>
<template>
  <div class="grid w-full gap-2">
    <p>可输入 -、1. 等编辑中间状态，失焦后提交。</p>
    <InputNumber :default-value="8" />
  </div>
</template>
