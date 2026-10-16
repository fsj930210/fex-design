<script setup lang="ts">
import { scrollbarViewportLines } from '@fex-design/docs-shared/scrollbar-demo'
import { ref, useTemplateRef } from 'vue'
import { Scrollbar } from '@fex-design/vue/ui/scrollbar'
import { Button } from '@fex-design/vue/ui/button'
const scrollbar = useTemplateRef<InstanceType<typeof Scrollbar>>('scrollbar')
const lastKey = ref('尚未按键')
function viewport() { return scrollbar.value?.viewportElement }
function onKeydown(event: KeyboardEvent) { lastKey.value = event.key }
</script>
<template>
  <div class="grid w-full max-w-md gap-4">
    <div class="flex flex-wrap gap-2">
      <Button @click="viewport()?.scrollTo({ top: 0 })">回到顶部</Button>
      <Button @click="viewport()?.scrollBy({ top: 120 })">向下 120px</Button>
      <Button @click="viewport()?.scrollTo({ top: viewport()?.scrollHeight ?? 0 })">滚动到底部</Button>
    </div>
    <Scrollbar ref="scrollbar" class="h-48 w-72 rounded-md border" auto-hide="never" :overflow="{ x: 'hidden' }" :viewport-props="{ role: 'region', 'aria-label': '可通过键盘滚动的内容', tabindex: 0, class: 'outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary', onKeydown }">
      <div class="grid gap-3 p-4">
        <p v-for="line in scrollbarViewportLines" :key="line">{{ line }}</p>
      </div>

    </Scrollbar>
    <output class="text-sm text-muted-foreground">最近按键：{{ lastKey }}</output>
  </div>
</template>
