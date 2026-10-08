<script setup lang="ts">
import { Progress, ProgressTrack, ProgressRange, ProgressValue } from '@fex-design/vue/primitive/progress'
defineOptions({ name: 'ProgressPrimitiveLinecapExample' })
</script>

<template>
<div class="grid w-full max-w-md gap-3">
    <div class="flex items-center gap-3"><span class="w-12 text-sm text-muted-foreground">直角</span>
      <Progress :value="50" class="flex flex-1 flex-col"><div class="flex w-full items-center"><ProgressTrack class="min-w-0 flex-1" :style="{ borderRadius: '0px' }"><ProgressRange :style="{ borderRadius: '0px' }" /></ProgressTrack><ProgressValue class="ms-2 shrink-0 text-sm font-medium">50%</ProgressValue></div></Progress>
    </div>
    <div class="flex items-center gap-3"><span class="w-12 text-sm text-muted-foreground">小圆角</span>
      <Progress :value="50" class="flex flex-1 flex-col"><div class="flex w-full items-center"><ProgressTrack class="min-w-0 flex-1" :style="{ borderRadius: '2px' }"><ProgressRange :style="{ borderRadius: '2px' }" /></ProgressTrack><ProgressValue class="ms-2 shrink-0 text-sm font-medium">50%</ProgressValue></div></Progress>
    </div>
    <div class="flex items-center gap-3"><span class="w-12 text-sm text-muted-foreground">胶囊</span>
      <Progress :value="50" class="flex flex-1 flex-col"><div class="flex w-full items-center"><ProgressTrack class="min-w-0 flex-1" :style="{ borderRadius: '9999px' }"><ProgressRange :style="{ borderRadius: '9999px' }" /></ProgressTrack><ProgressValue class="ms-2 shrink-0 text-sm font-medium">50%</ProgressValue></div></Progress>
    </div>
</div>
</template>
