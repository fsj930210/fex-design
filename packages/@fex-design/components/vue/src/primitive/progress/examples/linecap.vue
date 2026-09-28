<template><div class="grid gap-3"><Progress v-for="linecap in ['round','butt','square']" :key="linecap" :value="60" :linecap="linecap"><ProgressTrack><ProgressRange /></ProgressTrack></Progress></div></template>
<script setup lang="ts">import { Progress, ProgressTrack, ProgressRange } from '@fex-design/vue/primitive/progress'; const linecaps = ['round','butt','square'] as const</script>
