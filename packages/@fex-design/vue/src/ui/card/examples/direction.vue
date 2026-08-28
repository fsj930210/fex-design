<script setup lang="ts">
import Card from '@fex-design/vue/ui/card'

const directions = ['ltr', 'rtl'] as const
</script>

<template>
  <div class="grid w-full gap-6 sm:grid-cols-2">
    <Card
      v-for="dir in directions"
      :key="dir"
      :dir="dir"
    >
      <template #title>{{ dir.toUpperCase() }}</template>
      <template #description>Header 与 Footer 按逻辑方向排列。</template>
      内容区域保持可读顺序。
      <template #extra><button class="rounded-md border px-3 py-1.5 text-sm">操作</button></template>
      <template #footer><button class="rounded-md bg-primary px-3 py-1.5 text-primary-foreground">保存</button></template>
    </Card>
  </div>
</template>
