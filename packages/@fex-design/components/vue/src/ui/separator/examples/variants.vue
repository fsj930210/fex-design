<script setup lang="ts">
import { Separator } from '@fex-design/vue/ui/separator'
const items = [
  ['Workspace', 'Fex Design'],
  ['Plan', 'Team'],
  ['Region', 'Asia Pacific'],
]
</script>
<template>
  <div class="grid w-full max-w-xl gap-3">
    <div class="grid gap-1.5"><span class="text-sm">Solid</span><Separator /></div>
    <div class="grid gap-1.5">
      <span class="text-sm">Dashed</span
      ><Separator class="h-0 border-t border-dashed bg-transparent" />
    </div>
    <div class="grid gap-1.5">
      <span class="text-sm">Dotted</span
      ><Separator class="h-0 border-t border-dotted bg-transparent" />
    </div>
  </div>
</template>
