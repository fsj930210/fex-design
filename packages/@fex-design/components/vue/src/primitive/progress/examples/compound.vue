<script setup lang="ts">
import { Progress, ProgressLabel, ProgressValue, ProgressTrack, ProgressRange } from '@fex-design/vue/primitive/progress'

defineOptions({ name: 'ProgressPrimitiveCompoundExample' })

</script>

<template>
  <div class="w-full max-w-md space-y-4">
    <Progress :value="45" class="w-full">
      <div class="flex items-center justify-between text-sm mb-1.5">
        <ProgressLabel>
          文件同步进度
        </ProgressLabel>
        <ProgressValue class="text-muted-foreground">
          45%
        </ProgressValue>
      </div>
      <ProgressTrack>
        <ProgressRange class="bg-info" />
      </ProgressTrack>
    </Progress>
  </div>
</template>
