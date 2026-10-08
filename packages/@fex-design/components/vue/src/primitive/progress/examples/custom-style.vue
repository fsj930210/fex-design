<script setup lang="ts">
import { Progress, ProgressTrack, ProgressRange, ProgressValue } from '@fex-design/vue/primitive/progress'

defineOptions({ name: 'ProgressPrimitiveCustomStyleExample' })

</script>

<template>
  <div class="w-full max-w-md space-y-4">
    <Progress :value="85" class="w-full">
      <ProgressTrack class="h-4 rounded-md bg-muted">
        <ProgressRange class="rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
      </ProgressTrack>
      <div class="mt-1 text-right">
        <ProgressValue class="text-xs font-mono text-muted-foreground">
          85%
        </ProgressValue>
      </div>
    </Progress>
  </div>
</template>
