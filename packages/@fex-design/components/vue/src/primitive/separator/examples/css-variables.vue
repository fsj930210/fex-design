<script setup lang="ts">
import { Separator } from '@fex-design/vue/primitive/separator'
const items = [
  ['Workspace', 'Fex Design'],
  ['Plan', 'Team'],
  ['Region', 'Asia Pacific'],
]
</script>
<template>
  <div class="grid w-full max-w-xl gap-2">
    <div>
      <div class="font-medium">Fex Design</div>
      <div class="text-sm text-muted-foreground">Composable components for five frameworks.</div>
    </div>
    <Separator
      class="[--primary:#7c3aed] [--border:#c4b5fd] [--muted-background:#ede9fe] [--foreground:#6d28d9] [--muted-foreground:#8b5cf6]"
    />
    <div class="text-sm">React · Vue · Solid · Svelte · Angular</div>
  </div>
</template>
