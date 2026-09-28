<script setup lang="ts">
import { Progress } from "@fex-design/vue/ui/progress"
</script>
<template>
  <div class="grid w-full max-w-md gap-3">
    <div v-for="cap in [{ label: '圆角', value: 'round' }, { label: '平截', value: 'butt' }, { label: '方角', value: 'square' }]" :key="cap.value" class="flex items-center gap-3"><span class="w-8 text-sm text-muted-foreground">{{ cap.label }}</span><Progress :value="50" :linecap="cap.value" :track-linecap="cap.value" class="flex-1" /></div>
  </div>
</template>
