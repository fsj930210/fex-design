<script setup lang="ts">
import { Badge, BadgeDot } from '@fex-design/vue/primitive/badge'
const colors = ['primary', 'info', 'success', 'warning', 'danger'] as const
</script>
<template>
  <div class="flex w-full flex-wrap justify-center gap-4">
    <div v-for="color in colors" :key="color" class="grid justify-items-center gap-2">
      <Badge :color="color">{{ color }}</Badge
      ><span class="inline-flex items-center gap-1.5"><BadgeDot :color="color" />{{ color }}</span>
    </div>
    <div class="grid justify-items-center gap-2">
      <Badge color="#7c3aed">custom</Badge
      ><span class="inline-flex items-center gap-1.5"><BadgeDot color="#7c3aed" />#7c3aed</span>
    </div>
  </div>
</template>
