<script setup lang="ts">
import AnchorDemo from './anchor-demo.vue'
import HorizontalDemo from './horizontal-demo.vue'
</script>
<template>
  <main class="min-h-screen bg-secondary-background px-2 md:px-6 py-4">
    <div class="mx-auto w-full max-w-5xl space-y-4">
      <header class="space-y-2">
        <RouterLink class="text-sm text-muted-foreground hover:text-foreground" to="/"
          >Back home</RouterLink
        >
        <h1 class="text-2xl font-semibold">Anchor</h1>
        <p class="text-sm text-muted-foreground">
          Navigate and track sections in a scroll container.
        </p>
      </header>
      <div class="grid gap-4"><AnchorDemo /><HorizontalDemo /></div>
    </div>
  </main>
</template>
