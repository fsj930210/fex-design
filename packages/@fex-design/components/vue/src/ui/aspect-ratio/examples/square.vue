<script setup lang="ts">
import { AspectRatio } from '../aspect-ratio'
import image from './aspect-ratio-demo.svg'
</script>
<template>
  <AspectRatio :ratio="1" class="max-w-64"
    ><img :src="image" alt="Mountain landscape" class="size-full object-cover"
  /></AspectRatio>
</template>
