<script setup lang="ts">
import { BadgeRibbon } from '@fex-design/vue/primitive/badge'
const colors = ['primary', 'info', 'success', 'warning', 'danger', '#7c3aed'] as const
</script>
<template>
  <div class="grid w-full max-w-xl gap-4 px-2">
    <div v-for="color in colors" :key="color" class="relative">
      <div class="overflow-hidden rounded-lg border">
        <div class="border-b px-4 py-3 font-semibold">{{ color }} Ribbon</div>
        <div class="px-4 py-3 text-muted-foreground">当前颜色：{{ color }}</div>
      </div>
      <BadgeRibbon :color="color">推荐</BadgeRibbon>
    </div>
  </div>
</template>
