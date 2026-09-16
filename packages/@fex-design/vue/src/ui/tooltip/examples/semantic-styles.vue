<script setup lang="ts">
import { Tooltip } from '@fex-design/vue/ui/tooltip'
import { Button } from '@fex-design/vue/ui/button'
</script>
<template>
  <div class="flex min-h-64 items-center justify-center">
    <Tooltip
      title="这是明显放大的紫色结构化提示"
      :class-names="{ root: 'rounded-2xl font-semibold shadow-xl', arrow: 'rounded-[3px]' }"
      :styles="{
        root: {
          backgroundColor: '#7c3aed',
          color: '#fff',
          fontSize: '16px',
          lineHeight: '24px',
          maxWidth: '260px',
          padding: '12px 20px',
        },
        arrow: { backgroundColor: '#7c3aed', width: '12px', height: '12px' },
      }"
      ><Button>查看结构化样式</Button></Tooltip
    >
  </div>
</template>
