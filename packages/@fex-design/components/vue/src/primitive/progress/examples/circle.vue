<template>
  <div class="flex gap-4">
    <Progress :value="75" variant="circle" :size="96" :thickness="8" class="relative">
      <ProgressCircle>
        <ProgressCircleTrack />
        <ProgressCircleRange class="text-primary" />
      </ProgressCircle>
      <div class="absolute inset-0 flex items-center justify-center">
        <ProgressValue class="text-sm font-semibold" />
      </div>
    </Progress>
  </div>
</template>

<script setup lang="ts">
import {
  Progress,
  ProgressCircle,
  ProgressCircleTrack,
  ProgressCircleRange,
  ProgressValue,
} from '@fex-design/vue/primitive/progress'
</script>
