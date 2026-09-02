<script setup lang="ts">
import { Tag } from '@fex-design/vue/ui/tag'

const directions = ['ltr', 'rtl'] as const
</script>

<template>
  <div class="grid w-full gap-6 sm:grid-cols-2">
    <section
      v-for="direction in directions"
      :key="direction"
      :dir="direction"
      class="grid gap-3 rounded-lg border p-4"
    >
      <strong>{{ direction === 'ltr' ? 'LTR · 中文示例' : 'RTL · مثال عربي' }}</strong>
      <div class="flex flex-wrap gap-2">
        <Tag color="info">{{ direction === 'ltr' ? '状态标签' : 'علامة الحالة' }}</Tag>
        <Tag color="primary" closable>{{ direction === 'ltr' ? '可关闭标签' : 'وسم قابل للإغلاق' }}</Tag>
      </div>
    </section>
  </div>
</template>
