<script setup lang="ts">
import { AspectRatio } from '../aspect-ratio'
</script>
<template>
  <AspectRatio :ratio="1" class="max-w-64"
    ><img src="/aspect-ratio-demo.svg" alt="Mountain landscape" class="size-full object-cover"
  /></AspectRatio>
</template>
