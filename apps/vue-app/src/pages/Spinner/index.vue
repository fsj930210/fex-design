<script setup lang="ts">
import { Spinner } from '@fex-design/vue/ui/spinner'
import Card from '@fex-design/vue/ui/card'
</script>

<template>
  <main class="min-h-screen bg-secondary-background px-2 md:px-6 py-4">
    <div class="mx-auto w-full max-w-5xl space-y-4">
      <header class="space-y-2">
        <RouterLink class="text-sm text-muted-foreground hover:text-foreground" to="/"
          >Back home</RouterLink
        >
        <h1 class="text-2xl font-semibold text-foreground">Spinner</h1>
        <p class="max-w-2xl text-sm leading-6 text-muted-foreground">
          Use spinners for local loading feedback.
        </p>
      </header>
      <Card title="Sizes" description="Available spinner sizes."
        ><div class="flex min-w-0 flex-wrap items-center gap-3">
          <Spinner size="sm" aria-label="Loading" /><Spinner
            size="md"
            aria-label="Loading"
          /><Spinner size="lg" aria-label="Loading" /></div
      ></Card>
    </div>
  </main>
</template>
