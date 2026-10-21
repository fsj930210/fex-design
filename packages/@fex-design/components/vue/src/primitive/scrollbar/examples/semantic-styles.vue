<script setup lang="ts">
import {
  ScrollbarRoot,
  ScrollbarViewport,
  ScrollbarBar,
  ScrollbarTrack,
  ScrollbarThumb,
  ScrollbarCorner,
} from '@fex-design/vue/primitive/scrollbar'
import { scrollbarDemoLines } from '@fex-design/docs-shared/scrollbar-demo'
</script>
<template>
  <div class="flex w-full flex-wrap gap-6">
    <section class="grid gap-3">
      <h4 class="text-sm font-medium">各轴部件独立设置 classNames/styles</h4>
      <ScrollbarRoot
        show-track
        auto-hide="never"
        :overflow="{ x: 'auto', y: 'auto' }"
        class="h-48 w-72 rounded-md border"
        ><ScrollbarViewport
          class="bg-muted-background/30"
          :style="{ backgroundColor: 'var(--background)' }"
          ><div class="grid w-[40rem] gap-3 p-4">
            <p v-for="line in scrollbarDemoLines" :key="line">{{ line }}</p>
          </div></ScrollbarViewport
        ><ScrollbarBar axis="x" class="z-20" :style="{ insetInlineStart: '16px' }"
          ><ScrollbarTrack axis="x" class="bg-primary/15" :style="{ borderRadius: '4px' }"
            ><ScrollbarThumb
              axis="x"
              class="bg-primary"
              :style="{ borderRadius: '4px' }" /></ScrollbarTrack></ScrollbarBar
        ><ScrollbarBar axis="y" class="z-20" :style="{ top: '16px' }"
          ><ScrollbarTrack axis="y" class="bg-primary/15" :style="{ borderRadius: '4px' }"
            ><ScrollbarThumb
              axis="y"
              class="bg-primary"
              :style="{ borderRadius: '4px' }" /></ScrollbarTrack></ScrollbarBar
        ><ScrollbarCorner class="bg-primary/15" :style="{ borderRadius: '2px' }"
      /></ScrollbarRoot>
    </section>
  </div>
</template>
