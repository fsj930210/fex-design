<script setup lang="ts">
import BasicDemo from './basic-demo.vue'
import CustomTriggerDemo from './custom-trigger-demo.vue'
import ParamsDemo from './params-demo.vue'
import PrefixDemo from './prefix-demo.vue'
import ValidationDemo from './validation-demo.vue'
</script>

<template>
  <main class="min-h-screen bg-secondary-background px-2 md:px-6 py-4">
    <div class="mx-auto w-full max-w-5xl space-y-4">
      <header class="space-y-2">
        <RouterLink class="text-sm text-muted-foreground hover:text-foreground" to="/">Back home</RouterLink>
        <h1 class="text-2xl font-semibold text-foreground">Mentions primitive</h1>
        <p class="max-w-2xl text-sm leading-6 text-muted-foreground">
          Mention primitives identify prefix queries, render caller-owned items, and notify selection.
        </p>
      </header>
      <div class="space-y-4">
        <BasicDemo />
        <PrefixDemo />
        <ParamsDemo />
        <CustomTriggerDemo />
        <ValidationDemo />
      </div>
    </div>
  </main>
</template>
