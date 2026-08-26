<script setup lang="ts">
import Card from '../card.vue'
</script>
<template>
  <Card
    class="w-full max-w-2xl [--card-border:1px_solid_var(--border)]"
    title="生产环境"
    description="新加坡 · 最近部署于 3 分钟前"
    :class-names="{ title: 'text-lg font-semibold' }"
    ><template #extra
      ><div class="flex items-center gap-2">
        <span class="size-2 rounded-full bg-emerald-500" /><span
          class="text-sm font-semibold text-emerald-700"
          >运行中</span
        >
      </div></template
    >Extra 与标题说明独立，可放状态、操作或补充信息。</Card
  >
</template>
