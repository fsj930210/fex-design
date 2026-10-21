<script setup lang="ts">
import { scrollbarViewportLines } from '@fex-design/docs-shared/scrollbar-demo'
import { ref, useTemplateRef } from 'vue'
import {
  ScrollbarRoot,
  ScrollbarViewport,
  ScrollbarBar,
  ScrollbarTrack,
  ScrollbarThumb,
} from '@fex-design/vue/primitive/scrollbar'
import { Button } from '@fex-design/vue/ui/button'
const scrollbar = useTemplateRef<InstanceType<typeof ScrollbarViewport>>('scrollbar')
const lastKey = ref('尚未按键')
function viewport() {
  return scrollbar.value?.element
}
function onKeydown(event: KeyboardEvent) {
  lastKey.value = event.key
}
</script>
<template>
  <div class="grid w-full max-w-md gap-4">
    <div class="flex flex-wrap gap-2">
      <Button @click="viewport()?.scrollTo({ top: 0 })">回到顶部</Button>
      <Button @click="viewport()?.scrollBy({ top: 120 })">向下 120px</Button>
      <Button @click="viewport()?.scrollTo({ top: viewport()?.scrollHeight ?? 0 })"
        >滚动到底部</Button
      >
    </div>
    <ScrollbarRoot
      class="h-48 w-72 rounded-md border"
      auto-hide="never"
      :overflow="{ x: 'hidden' }"
    >
      <ScrollbarViewport
        ref="scrollbar"
        role="region"
        aria-label="可通过键盘滚动的内容"
        :tabindex="0"
        class="outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
        @keydown="onKeydown"
        ><div class="grid gap-3 p-4">
          <p v-for="line in scrollbarViewportLines" :key="line">{{ line }}</p>
        </div> </ScrollbarViewport
      ><ScrollbarBar axis="y"
        ><ScrollbarTrack axis="y"><ScrollbarThumb axis="y" /></ScrollbarTrack
      ></ScrollbarBar>
    </ScrollbarRoot>
    <output class="text-sm text-muted-foreground">最近按键：{{ lastKey }}</output>
  </div>
</template>
