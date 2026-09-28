<template>
  <div class="w-full max-w-md space-y-4">
    <Progress :value="45">
      <div class="flex items-center justify-between text-sm mb-1.5">
        <ProgressLabel>文件同步进度</ProgressLabel>
        <ProgressValue class="text-muted-foreground" />
      </div>
      <ProgressTrack>
        <ProgressRange class="bg-info" />
      </ProgressTrack>
    </Progress>
  </div>
</template>

<script setup lang="ts">
import {
  Progress,
  ProgressLabel,
  ProgressTrack,
  ProgressRange,
  ProgressValue,
} from '@fex-design/vue/primitive/progress'
</script>
