<script setup lang="ts">
import { CheckIcon } from '@fex-design/vue/icons/check'
import type { ProgressStatus, ProgressVariant } from '@fex-design/core/progress/types'
import type { ProgressProps } from './types'

defineOptions({ name: 'ProgressInfo' })
const props = defineProps<{
  percentage: number | null
  value: number | null
  status: ProgressStatus
  variant: ProgressVariant
  format?: ProgressProps['format']
}>()
</script>

<template>
  <slot :percent="percentage === null ? null : Math.round(percentage * 100)" :value="value">
    <template v-if="format">{{ format(percentage === null ? null : Math.round(percentage * 100), value) }}</template>
    <CheckIcon v-else-if="status === 'success' && variant !== 'line'" class="size-6 text-success" />
    <span v-else-if="status === 'success' && percentage !== null && percentage >= 1"
      class="inline-flex size-4 items-center justify-center rounded-full bg-success text-[10px] text-white">
      <CheckIcon class="size-3" />
    </span>
    <template v-else>{{ percentage === null ? '' : `${Math.round(percentage * 100)}%` }}</template>
  </slot>
</template>
