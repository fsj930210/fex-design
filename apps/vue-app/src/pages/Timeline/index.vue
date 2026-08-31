<script setup lang="ts">
import AlternateDemo from './alternate-demo.vue'
import BasicDemo from './basic-demo.vue'
import CustomNodeDemo from './custom-node-demo.vue'
import HorizontalDemo from './horizontal-demo.vue'
import IconDemo from './icon-demo.vue'
import PlacementDemo from './placement-demo.vue'
import ReverseDemo from './reverse-demo.vue'
import StatusDemo from './status-demo.vue'
</script>
<template>
  <main class="min-h-screen bg-secondary-background px-2 md:px-6 py-4">
    <div class="mx-auto w-full max-w-5xl space-y-4">
      <header class="space-y-4">
        <RouterLink class="text-sm text-muted-foreground hover:text-foreground" to="/"
          >Back home</RouterLink
        >
        <div>
          <h1 class="text-2xl font-semibold text-foreground">Timeline</h1>
          <p class="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Composable vertical and horizontal timelines with open statuses, custom indicators and
            per-item placement.
          </p>
        </div>
      </header>
      <div class="space-y-4">
        <BasicDemo /><StatusDemo /><IconDemo /><CustomNodeDemo /><AlternateDemo /><PlacementDemo /><HorizontalDemo /><ReverseDemo />
      </div>
    </div>
  </main>
</template>
