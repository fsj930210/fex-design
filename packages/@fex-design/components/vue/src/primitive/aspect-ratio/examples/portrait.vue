<script setup lang="ts">
import { AspectRatio } from '..'
</script>
<template>
  <AspectRatio :ratio="9 / 16" class="max-w-48"
    ><img src="/aspect-ratio-demo.svg" alt="Mountain landscape" class="size-full object-cover"
  /></AspectRatio>
</template>
