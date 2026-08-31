<script setup lang="ts">
import BasicDemo from './basic-demo.vue'
import ControlledDemo from './controlled-demo.vue'
import CustomDemo from './custom-demo.vue'
import DisabledDemo from './disabled-demo.vue'
import DynamicDemo from './dynamic-demo.vue'
import NavigationDemo from './navigation-demo.vue'
import ResponsiveDemo from './responsive-demo.vue'
</script>

<template>
  <main class="min-h-screen bg-secondary-background px-2 md:px-6 py-4">
    <div class="mx-auto w-full max-w-5xl space-y-4">
      <header class="space-y-4">
        <RouterLink class="text-sm text-muted-foreground hover:text-foreground" to="/"
          >Back home</RouterLink
        >
        <div>
          <h1 class="text-2xl font-semibold">Steps</h1>
          <p class="mt-2 text-sm text-muted-foreground">
            Value-based workflow stages with navigation and responsive layout.
          </p>
        </div>
      </header>
      <div class="space-y-4">
        <BasicDemo /><NavigationDemo /><DisabledDemo /><ControlledDemo /><DynamicDemo /><CustomDemo /><ResponsiveDemo />
      </div>
    </div>
  </main>
</template>
