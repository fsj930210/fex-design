<script setup lang="ts">
import { progressRootClassName } from "@fex-design/components-styles/progress"
import { normalizeProgressValue, resolveProgressStatus } from "@fex-design/core/progress/progress"
import type {
  ProgressContextValue,
  ProgressStatus,
  ProgressVariant,
} from "@fex-design/core/progress/types"
import { cn } from "@fex-design/utils"
import { computed, provide, useTemplateRef } from "vue"
import { progressContextKey } from "./progress-context"

defineOptions({ name: "Progress", inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    value?: number | null
    min?: number
    max?: number
    variant?: ProgressVariant
    status?: ProgressStatus
    size?: number
    thickness?: number
  }>(),
  {
    value: 0,
    min: 0,
    max: 100,
    variant: "line",
    status: undefined,
    size: 48,
    thickness: undefined,
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
  size: props.size,
}))

provide(progressContextKey, contextValue)
const element = useTemplateRef<HTMLDivElement>('element')
defineExpose({ element })
</script>
<template>
  <div
    ref="element"
    v-bind="$attrs"
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
