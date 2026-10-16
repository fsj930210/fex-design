<script setup lang="ts">
import { onMounted, onBeforeUnmount, useTemplateRef } from 'vue'
import { Scrollbar } from '@fex-design/vue/ui/scrollbar'
import { scrollbarColumns, scrollbarRows, observeScrollbarHeader } from '@fex-design/docs-shared/scrollbar-demo'
const root = useTemplateRef<InstanceType<typeof Scrollbar>>('root')
const header = useTemplateRef<HTMLTableSectionElement>('header')
let cleanup: (() => void) | undefined
onMounted(() => { if (root.value?.element && header.value) cleanup = observeScrollbarHeader(root.value.element, header.value) })
onBeforeUnmount(() => cleanup?.())
</script>
<template>
  <Scrollbar ref="root" class="h-64 w-full max-w-xl rounded-md border" auto-hide="never" :styles="{ barY: { top: 'var(--table-header-height)' } }" :viewport-props="{ role: 'region', 'aria-label': 'Orders', tabindex: 0 }">
    <table class="w-full min-w-[900px] table-fixed border-separate border-spacing-0 text-left text-sm">
      <thead ref="header" class="sticky top-0 z-10 bg-background"><tr><th scope="col" v-for="column in scrollbarColumns" :key="column" class="border-b px-4 py-3">{{ column }}</th></tr></thead>
      <tbody><tr v-for="row in scrollbarRows" :key="row.id"><td class="border-b px-4 py-3">{{ row.id }}</td><td class="border-b px-4 py-3">{{ row.customer }}</td><td class="border-b px-4 py-3">{{ row.address }}</td><td class="border-b px-4 py-3">{{ row.status }}</td><td class="border-b px-4 py-3">{{ row.amount }}</td></tr></tbody>
    </table>
  </Scrollbar>
</template>
