<script setup lang="ts">
import { Progress } from '@fex-design/vue/ui/progress'
defineOptions({ name: 'ProgressMultiRangeExample' })
const ranges = [{ value: 30, color: 'var(--primary)' }, { value: 25, color: 'var(--success)' }, { value: 15, color: 'var(--warning)' }]
const format = () => '已分配 70%'
</script>

<template>
<div class="grid w-full max-w-md gap-3">
  <Progress :ranges="ranges" :thickness="12" :format="format" label="任务分布" infoPlacement="top" />
  <div class="flex gap-4 text-sm"><span>已完成 30%</span><span>处理中 25%</span><span>待审核 15%</span></div>
</div>
</template>
