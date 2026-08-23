<script setup lang="ts">
import AccordionDemo from './accordion-demo.vue'
import BasicDemo from './basic-demo.vue'
import ControlledDemo from './controlled-demo.vue'
import CustomDemo from './custom-demo.vue'
import NestedDemo from './nested-demo.vue'
import RefDemo from './ref-demo.vue'
import VariantDemo from './variant-demo.vue'
</script>

<template>
  <main class="min-h-screen bg-secondary-background px-2 md:px-6 py-4">
    <div class="mx-auto w-full max-w-5xl space-y-4">
      <header class="space-y-1.5">
        <RouterLink class="text-sm text-muted-foreground hover:text-foreground" to="/">Back home</RouterLink>
        <div>
          <h1 class="text-2xl font-semibold text-foreground">Collapse</h1>
          <p class="max-w-3xl text-sm leading-6 text-muted-foreground">
            Composable disclosure panels with multiple mode, accordion mode, controlled state,
            instance methods and complete custom rendering.
          </p>
        </div>
      </header>
      <div class="space-y-4">
        <BasicDemo />
        <AccordionDemo />
        <ControlledDemo />
        <RefDemo />
        <CustomDemo />
        <VariantDemo />
        <NestedDemo />
      </div>
    </div>
  </main>
</template>
