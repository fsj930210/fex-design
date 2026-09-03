<script setup lang="ts">import { SkeletonButton, SkeletonText } from '@fex-design/vue/primitive/skeleton'</script>
<template><div class="grid min-w-[32rem] grid-cols-[1.2fr_1fr_6rem] gap-x-6 gap-y-4"><template v-for="index in 12" :key="index"><SkeletonButton v-if="index % 3 === 0" size="sm" class="w-16" /><SkeletonText v-else :class="index <= 3 ? 'w-2/3' : undefined" /></template></div></template>

