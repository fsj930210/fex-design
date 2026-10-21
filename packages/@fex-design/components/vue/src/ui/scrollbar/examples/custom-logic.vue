<script setup lang="ts">
import { scrollbarDemoLines } from '@fex-design/docs-shared/scrollbar-demo'
import {
  useScrollbar,
  ScrollbarViewport,
  ScrollbarBar,
  ScrollbarTrack,
  ScrollbarThumb,
} from '@fex-design/vue/ui/scrollbar'
const { root } = useScrollbar(() => ({ autoHide: 'never' }))
</script>
<template>
  <div
    ref="root"
    data-slot="scrollbar-root"
    class="relative isolate h-48 w-72 overflow-hidden rounded-md border"
  >
    <ScrollbarViewport :overflow="{ x: 'hidden' }">
      <div class="grid gap-3 p-4">
        <p v-for="line in scrollbarDemoLines" :key="line">{{ line }}</p>
      </div>
    </ScrollbarViewport>
    <ScrollbarBar axis="y">
      <ScrollbarTrack axis="y">
        <ScrollbarThumb axis="y" />
      </ScrollbarTrack>
    </ScrollbarBar>
  </div>
</template>
