<script setup lang="ts">
import { Separator } from '@fex-design/vue/ui/separator'
import Card from '@fex-design/vue/ui/card'
const items = [
  ['Workspace', 'Fex Design'],
  ['Plan', 'Team'],
  ['Region', 'Asia Pacific'],
]
</script>
<template>
  <Card title="Basic" description="Separate related sections with a semantic horizontal rule."
    ><div class="grid max-w-xl gap-2">
      <div>
        <div class="font-medium">Fex Design</div>
        <div class="text-sm text-muted-foreground">Composable components for five frameworks.</div>
      </div>
      <Separator />
      <div class="text-sm">React · Vue · Solid · Svelte · Angular</div>
    </div></Card
  >
</template>
