<template><Progress :max="100"><ProgressTrack class="h-3"><ProgressRange :value="30" class="bg-primary" /><ProgressRange :value="25" :offset="30" class="bg-success" /><ProgressRange :value="15" :offset="55" class="bg-warning" /></ProgressTrack></Progress></template>
<script setup lang="ts">import { Progress, ProgressTrack, ProgressRange } from '@fex-design/vue/primitive/progress'</script>
