<script setup lang="ts">
import { AspectRatio } from '../aspect-ratio'
</script>
<template>
  <AspectRatio :ratio="16 / 9"
    ><img src="/aspect-ratio-demo.svg" alt="Mountain landscape" class="size-full object-cover"
  /></AspectRatio>
</template>
