<script setup lang="ts">
import { Progress, ProgressTrack, ProgressRange, ProgressValue } from '@fex-design/vue/primitive/progress'
import { CheckIcon } from '@fex-design/vue/icons/check'

defineOptions({ name: 'StepLineDemo' })
defineProps<{ value: number; active: number }>()
const indices = [0, 1, 2, 3, 4]
</script>

<template>
  <div class="inline-flex items-center gap-1.5">
    <Progress :value="value" class="contents">
      <ProgressTrack class="flex h-auto w-auto min-w-0 items-center gap-1 overflow-visible bg-transparent">
        <ProgressRange
          v-for="index in indices"
          :key="index"
          :value="1"
          :style="{'width':'1rem'}"
          :class="index < active ? 'h-2 flex-none rounded-[1px] bg-info' : 'h-2 flex-none rounded-[1px] bg-[var(--progress-remaining)]'"
        />
      </ProgressTrack>
      <template v-if="active < 5">
        <ProgressValue class="text-sm">
          {{ value }}%
        </ProgressValue>
      </template>
      <template v-else>
        <span class="flex size-4 items-center justify-center rounded-full bg-success text-white">
          <CheckIcon class="size-3" />
        </span>
      </template>
    </Progress>
  </div>
</template>
