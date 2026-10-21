<script setup lang="ts">
import { AspectRatio } from '@fex-design/vue/primitive/aspect-ratio'
</script>
<template>
  <AspectRatio
    class="overflow-hidden rounded-xl border-4 border-[var(--border)] [--primary:#7c3aed] [--border:#c4b5fd] [--muted-background:#ede9fe] [--foreground:#6d28d9] [--muted-foreground:#8b5cf6]"
    :ratio="16 / 9"
    ><img src="/aspect-ratio-demo.svg" alt="Mountain landscape" class="size-full object-cover"
  /></AspectRatio>
</template>
