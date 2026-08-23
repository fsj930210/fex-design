<script setup lang="ts">
import BasicDemo from './basic-demo.vue'
import AutosizeDemo from './autosize-demo.vue'
import ControlledDemo from './controlled-demo.vue'
import CountDemo from './count-demo.vue'
import FooterDemo from './footer-demo.vue'
import ValidationDemo from './validation-demo.vue'
</script>

<template>
  <main class="min-h-screen bg-secondary-background px-2 md:px-6 py-4">
    <div class="mx-auto w-full max-w-5xl space-y-4">
      <header class="space-y-2">
        <RouterLink class="text-sm text-muted-foreground hover:text-foreground" to="/">Back home</RouterLink>
        <h1 class="text-2xl font-semibold text-foreground">Textarea primitives</h1>
        <p class="max-w-2xl text-sm leading-6 text-muted-foreground">
          TextareaRoot coordinates value, autosize, clear and footer composition while TextareaInput remains the native textarea node.
        </p>
      </header>

      <div class="space-y-4">
        <BasicDemo />
        <AutosizeDemo />
        <ControlledDemo />
        <CountDemo />
        <FooterDemo />
        <ValidationDemo />
      </div>
    </div>
  </main>
</template>
