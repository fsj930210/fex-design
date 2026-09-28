<template><div class="grid gap-3"><Progress v-for="thickness in [4,8,12]" :key="thickness" :value="60" :thickness="thickness"><ProgressTrack><ProgressRange /></ProgressTrack></Progress></div></template>
<script setup lang="ts">import { Progress, ProgressTrack, ProgressRange } from '@fex-design/vue/primitive/progress'</script>
