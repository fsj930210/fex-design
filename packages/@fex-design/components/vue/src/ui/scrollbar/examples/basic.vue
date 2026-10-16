<script setup lang="ts">
import { scrollbarDemoLines } from '@fex-design/docs-shared/scrollbar-demo'
import { Scrollbar } from '@fex-design/vue/ui/scrollbar'
</script>
<template>
  <Scrollbar class="h-48 w-72 rounded-md border" auto-hide="never" :overflow="{ x: 'hidden' }" :viewport-props="{ overflow: { y: 'auto' } }">
    <div class="grid gap-3 p-4">
        <p v-for="line in scrollbarDemoLines" :key="line">{{ line }}</p>
      </div>
  </Scrollbar>
</template>
