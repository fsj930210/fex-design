<template>
  <div class="grid w-full max-w-md gap-4">
    <Progress :value="35" class="flex w-full flex-col">
      <div class="flex w-full items-center justify-between text-sm mb-1.5"><ProgressLabel>Upload progress</ProgressLabel><ProgressValue>35%</ProgressValue></div>
      <div class="flex w-full items-center"><ProgressTrack class="min-w-0 flex-1"><ProgressRange /></ProgressTrack></div>
    </Progress>
    <Progress :value="65" class="flex w-full flex-col">
      <div class="flex w-full items-center"><ProgressTrack class="min-w-0 flex-1"><ProgressRange /></ProgressTrack><ProgressValue class="ms-2 shrink-0 text-sm font-medium">65%</ProgressValue></div>
    </Progress>
  </div>
</template>

<script setup lang="ts">
import { Progress, ProgressLabel, ProgressRange, ProgressTrack, ProgressValue } from '@fex-design/vue/primitive/progress'
</script>
