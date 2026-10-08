<script setup lang="ts">
import { Progress, ProgressTrack, ProgressRange, ProgressValue } from '@fex-design/vue/primitive/progress'
import { CheckIcon } from '@fex-design/vue/icons/check'

defineOptions({ name: 'ProgressPrimitiveStatusExample' })

</script>

<template>
  <div class="grid w-full max-w-md gap-3">
    <Progress :value="0" status="pending" class="flex w-full flex-col">
      <div class="flex w-full items-center">
        <ProgressTrack class="min-w-0 flex-1">
          <ProgressRange />
        </ProgressTrack>
        <ProgressValue class="ms-2 shrink-0 text-sm font-medium">
          0%
        </ProgressValue>
      </div>
    </Progress>
    <Progress :value="40" status="active" class="flex w-full flex-col">
      <div class="flex w-full items-center">
        <ProgressTrack class="min-w-0 flex-1">
          <ProgressRange />
        </ProgressTrack>
        <ProgressValue class="ms-2 shrink-0 text-sm font-medium">
          40%
        </ProgressValue>
      </div>
    </Progress>
    <Progress :value="60" status="active" class="flex w-full flex-col">
      <div class="flex w-full items-center">
        <ProgressTrack class="min-w-0 flex-1">
          <ProgressRange />
        </ProgressTrack>
        <ProgressValue class="ms-2 shrink-0 text-sm font-medium">
          60%
        </ProgressValue>
      </div>
    </Progress>
    <Progress :value="100" status="success" class="flex w-full flex-col">
      <div class="flex w-full items-center">
        <ProgressTrack class="min-w-0 flex-1">
          <ProgressRange />
        </ProgressTrack>
        <ProgressValue class="ms-2 shrink-0 text-sm font-medium">
          <span class="inline-flex size-4 items-center justify-center rounded-full bg-success text-[10px] text-white">
            <CheckIcon class="size-3" />
          </span>
        </ProgressValue>
      </div>
    </Progress>
    <Progress :value="80" status="error" class="flex w-full flex-col">
      <div class="flex w-full items-center">
        <ProgressTrack class="min-w-0 flex-1">
          <ProgressRange />
        </ProgressTrack>
        <ProgressValue class="ms-2 shrink-0 text-sm font-medium">
          80%
        </ProgressValue>
      </div>
    </Progress>
  </div>
</template>
