<script setup lang="ts">
import { progressRootClassName } from "@fex-design/components-styles/progress"
import { normalizeProgressValue, resolveProgressStatus } from "@fex-design/core/progress/progress"
import type {
  ProgressContextValue,
  ProgressColor,
  ProgressLinecap,
  ProgressStatus,
  ProgressVariant,
} from "@fex-design/core/progress/types"
import { cn } from "@fex-design/utils"
import { computed, provide } from "vue"
import { progressContextKey } from "./progress-context"
import ProgressCircle from "./progress-circle.vue"
import ProgressCircleRange from "./progress-circle-range.vue"
import ProgressCircleTrack from "./progress-circle-track.vue"
import ProgressRange from "./progress-range.vue"
import ProgressTrack from "./progress-track.vue"
import ProgressValue from "./progress-value.vue"

defineOptions({ name: "Progress" })

const props = withDefaults(
  defineProps<{
    value?: number | null
    min?: number
    max?: number
    variant?: ProgressVariant
    status?: ProgressStatus
    size?: number
    thickness?: number
    linecap?: ProgressLinecap
    trackLinecap?: ProgressLinecap
    color?: ProgressColor
    trackColor?: string
    gapDegree?: number
    gapPlacement?: "top" | "bottom" | "start" | "end"
  }>(),
  {
    value: 0,
    min: 0,
    max: 100,
    variant: "line",
    status: undefined,
    size: 48,
    thickness: undefined,
    linecap: "round",
    gapDegree: 75,
    gapPlacement: "bottom",
  },
)

const normalized = computed(() => normalizeProgressValue(props.value, props.min, props.max))
const resolvedThickness = computed(() => props.thickness ?? (props.variant === "line" ? 8 : 4))
const resolvedStatus = computed(() => resolveProgressStatus(props.status, props.value, props.min, props.max))

const contextValue = computed<ProgressContextValue>(() => ({
  value: normalized.value.value,
  min: normalized.value.min,
  max: normalized.value.max,
  percentage: normalized.value.percentage,
  status: resolvedStatus.value,
  variant: props.variant,
  thickness: resolvedThickness.value,
  color: props.color,
  trackColor: props.trackColor,
  linecap: props.linecap,
  trackLinecap: props.trackLinecap,
  size: props.size,
}))

provide(progressContextKey, contextValue)
</script>
<template>
  <div
    role="progressbar"
    :aria-valuemin="normalized.min"
    :aria-valuemax="normalized.max"
    :aria-valuenow="normalized.value ?? undefined"
    :aria-valuetext="normalized.percentage !== null ? `${Math.round(normalized.percentage * 100)}%` : undefined"
    data-slot="progress"
    :data-status="resolvedStatus"
    :data-variant="props.variant"
    :class="cn(progressRootClassName, $attrs.class as string | undefined)"
  >
    <slot />
  </div>
</template>
