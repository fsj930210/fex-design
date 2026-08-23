<script setup lang="ts">
import BasicDemo from './basic-demo.vue'
import OneWayDemo from './one-way-demo.vue'
import CustomDemo from './custom-demo.vue'
import TreeDemo from './tree-demo.vue'
import TableDemo from './table-demo.vue'
import ValidationDemo from './validation-demo.vue'
</script>
<template>
  <main class="min-h-screen bg-secondary-background px-2 md:px-6 py-4">
    <div class="mx-auto w-full max-w-6xl space-y-4">
      <header class="space-y-2">
        <RouterLink class="text-sm text-muted-foreground hover:text-foreground" to="/"
          >Back home</RouterLink
        >
        <div>
          <h1 class="text-2xl font-semibold text-foreground">Transfer</h1>
          <p class="max-w-3xl text-sm leading-6 text-muted-foreground">
            Move ordered data between two built-in panels while keeping headers, bodies, footers and
            actions independently composable.
          </p>
        </div>
      </header>
      <div class="space-y-4">
        <BasicDemo /><OneWayDemo /><CustomDemo /><TreeDemo /><TableDemo /><ValidationDemo />
      </div>
    </div>
  </main>
</template>
