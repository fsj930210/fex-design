<script setup lang="ts">
import { InputNumber } from '@fex-design/vue/ui/input-number'
const formatter = (value: number | undefined) =>
  value === undefined ? '' : `￥${value.toLocaleString('zh-CN')}`
const parser = (text: string) => {
  const normalized = text.replace(/[￥,\s]/g, '')
  if (normalized === '') return undefined
  const value = Number(normalized)
  return Number.isFinite(value) ? value : undefined
}
</script>
<template>
  <div class="grid w-full gap-2">
    <p>金额</p>
    <InputNumber :default-value="1000" :formatter="formatter" :parser="parser" />
    <p class="text-sm text-muted-foreground">格式化展示与 number 值分离</p>
  </div>
</template>
