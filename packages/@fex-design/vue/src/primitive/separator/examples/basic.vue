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
      <Separator />
      <div class="text-sm">React · Vue · Solid · Svelte · Angular</div>
    </div>
</template>
