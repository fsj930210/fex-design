<script setup lang="ts">
import { scrollbarDemoLines } from '@fex-design/docs-shared/scrollbar-demo'
import {
  ScrollbarRoot,
  ScrollbarViewport,
  ScrollbarBar,
  ScrollbarCorner,
  ScrollbarTrack,
  ScrollbarThumb,
} from '@fex-design/vue/primitive/scrollbar'
</script>
<template>
  <ScrollbarRoot class="h-48 w-72 rounded-md border" auto-hide="never" :overflow="{ x: 'hidden' }">
    <ScrollbarViewport :overflow="{ y: 'auto' }">
      <div class="grid gap-3 p-4">
        <p v-for="line in scrollbarDemoLines" :key="line">{{ line }}</p>
      </div>
    </ScrollbarViewport>
    <ScrollbarBar axis="y">
      <ScrollbarTrack axis="y">
        <ScrollbarThumb axis="y" />
      </ScrollbarTrack>
    </ScrollbarBar>
    <ScrollbarCorner />
  </ScrollbarRoot>
</template>
