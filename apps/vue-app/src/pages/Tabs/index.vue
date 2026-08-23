<script setup lang="ts">
import BasicDemo from './basic-demo.vue'
import VariantDemo from './variant-demo.vue'
import DynamicDemo from './dynamic-demo.vue'
import SortableDemo from './sortable-demo.vue'
import CustomDemo from './custom-demo.vue'
</script>
<template>
  <main class="min-h-screen bg-secondary-background px-2 md:px-6 py-4">
    <div class="mx-auto w-full max-w-5xl space-y-4">
      <header class="space-y-1.5">
        <RouterLink class="text-sm text-muted-foreground hover:text-foreground" to="/"
          >Back home</RouterLink
        >
        <div>
          <h1 class="text-2xl font-semibold text-foreground">Tabs</h1>
          <p class="max-w-3xl text-sm leading-6 text-muted-foreground">
            Composable tab navigation with lazy retained content and custom rendering.
          </p>
        </div>
      </header>
      <div class="space-y-4">
        <BasicDemo /><VariantDemo /><DynamicDemo /><SortableDemo /><CustomDemo />
      </div>
    </div>
  </main>
</template>
