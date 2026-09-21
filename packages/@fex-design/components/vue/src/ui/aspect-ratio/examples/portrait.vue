<script setup lang="ts">
import { AspectRatio } from '../aspect-ratio'
import image from './aspect-ratio-demo.svg'
</script>
<template>
  <AspectRatio :ratio="9 / 16" class="max-w-48"
    ><img :src="image" alt="Mountain landscape" class="size-full object-cover"
  /></AspectRatio>
</template>
