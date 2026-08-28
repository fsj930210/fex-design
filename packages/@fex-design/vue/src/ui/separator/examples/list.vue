<script setup lang="ts">
import { Separator } from '@fex-design/vue/ui/separator'
import Card from '@fex-design/vue/ui/card'
const items = [
  ['Workspace', 'Fex Design'],
  ['Plan', 'Team'],
  ['Region', 'Asia Pacific'],
]
</script>
<template>
  <Card title="List" description="Place separators between rows, not after the final item."
    ><div class="grid max-w-lg">
      <div v-for="([label, value], index) in items" :key="label">
        <div class="flex justify-between py-2">
          <span>{{ label }}</span
          ><span class="text-muted-foreground">{{ value }}</span>
        </div>
        <Separator v-if="index < items.length - 1" />
      </div></div
  ></Card>
</template>
