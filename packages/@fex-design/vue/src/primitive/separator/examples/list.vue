<script setup lang="ts">
import { Separator } from '@fex-design/vue/primitive/separator'
const items = [
  ['Workspace', 'Fex Design'],
  ['Plan', 'Team'],
  ['Region', 'Asia Pacific'],
]
</script>
<template>
  <div class="grid w-full max-w-lg">
    <div v-for="([label, value], index) in items" :key="label">
      <div class="flex justify-between py-2">
        <span>{{ label }}</span
        ><span class="text-muted-foreground">{{ value }}</span>
      </div>
      <Separator v-if="index < items.length - 1" />
    </div>
  </div>
</template>
