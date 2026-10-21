<script setup lang="ts">
import { AspectRatio } from '@fex-design/vue/ui/aspect-ratio'
import image from './aspect-ratio-demo.svg'
</script>
<template>
  <AspectRatio
    class="overflow-hidden rounded-xl border-4 border-[var(--border)] border-violet-300 text-violet-900"
    :ratio="16 / 9"
    ><img :src="image" alt="Mountain landscape" class="size-full object-cover"
  /></AspectRatio>
</template>
