<script setup lang="ts">
import { scrollbarDemoLines } from '@fex-design/docs-shared/scrollbar-demo'
import { Scrollbar } from '@fex-design/vue/ui/scrollbar'
</script>
<template>
  <div class="flex w-full flex-wrap gap-6">
    <section class="grid gap-3">
      <h4 class="text-sm font-medium">各轴部件独立设置 classNames/styles</h4>
      <Scrollbar
        show-track
        class="h-48 w-72 rounded-md border"
        :auto-hide="'never'"
        :overflow="{ x: 'auto', y: 'auto' }"
        :class-names="{
          viewport: 'bg-muted-background/30',
          barX: 'z-20',
          barY: 'z-20',
          trackX: 'bg-primary/15',
          trackY: 'bg-primary/15',
          thumbX: 'bg-primary',
          thumbY: 'bg-primary',
          corner: 'bg-primary/15',
        }"
        :styles="{
          viewport: { backgroundColor: 'var(--background)' },
          barX: { insetInlineStart: '16px' },
          barY: { top: '16px' },
          trackX: { borderRadius: '4px' },
          trackY: { borderRadius: '4px' },
          thumbX: { borderRadius: '4px' },
          thumbY: { borderRadius: '4px' },
          corner: { borderRadius: '2px' },
        }"
        ><div class="grid w-[40rem] gap-3 p-4">
          <p v-for="line in scrollbarDemoLines" :key="line">{{ line }}</p>
        </div></Scrollbar
      >
    </section>
  </div>
</template>
