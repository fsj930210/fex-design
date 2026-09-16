<script setup lang="ts">
import { InputNumber } from '@fex-design/vue/ui/input-number'
</script>
<template>
  <div class="grid w-full gap-2">
    <p>允许范围：1–10 · 当前值：20 · 状态：超出最大值</p>
    <InputNumber :value="20" :min="1" :max="10" />
  </div>
</template>
