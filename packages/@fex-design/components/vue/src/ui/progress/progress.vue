<script setup lang="ts">
import {
  progressStepLineContainerClassName,
  progressStepLineItemClassName,
  progressStepLineTrackClassName,
  progressTopHeaderClassName,
} from '@fex-design/components-styles/progress'
import {
  getCircleStepsGeometry,
  getLineStepsGeometry,
  getLinearProgressBackground,
  normalizeProgressValue,
} from '@fex-design/core/progress/progress'
import type {
  ProgressColor,
  ProgressGapPlacement,
  ProgressInfoPlacement,
  ProgressLinecap,
  ProgressSize,
  ProgressStatus,
  ProgressVariant,
} from '@fex-design/core/progress/types'
import { CheckIcon } from '@fex-design/vue/icons/check'
import {
  Progress as PrimitiveProgress,
  ProgressCircle,
  ProgressCircleRange,
  ProgressCircleTrack,
  ProgressLabel,
  ProgressRange,
  ProgressTrack,
  ProgressValue,
} from '@fex-design/vue/primitive/progress'
import { cn } from '@fex-design/utils'
import { computed } from 'vue'

defineOptions({ name: 'Progress' })

const props = withDefaults(
  defineProps<{
    value?: number | null
    min?: number
    max?: number
    variant?: ProgressVariant
    status?: ProgressStatus
    size?: ProgressSize
    thickness?: number
    steps?: number
    gap?: number
    color?: ProgressColor
    trackColor?: string
    linecap?: ProgressLinecap
    trackLinecap?: ProgressLinecap
    gapDegree?: number
    gapPlacement?: ProgressGapPlacement
    showInfo?: boolean
    showValue?: boolean
    infoPlacement?: ProgressInfoPlacement
    label?: string
    format?: (percent: number | null, value: number | null) => any
    success?: boolean
    classNames?: Partial<Record<'root' | 'track' | 'range' | 'info' | 'label' | 'step', string>>
    styles?: Partial<Record<'root' | 'track' | 'range' | 'info' | 'label' | 'step', any>>
  }>(),
  {
    value: 0,
    min: 0,
    max: 100,
    variant: 'line',
    status: undefined,
    gap: 2,
    linecap: 'round',
    gapDegree: 75,
    gapPlacement: 'bottom',
    infoPlacement: 'outside',
  },
)

const normalized = computed(() => normalizeProgressValue(props.value, props.min, props.max))
const isComplete = computed(
  () => normalized.value.percentage !== null && normalized.value.percentage >= 1,
)
const isSuccess = computed(
  () => props.success || props.status === 'success' || (isComplete.value && !props.status),
)
const effectiveStatus = computed<ProgressStatus>(() => (isSuccess.value ? 'success' : props.status))
const shouldShowInfo = computed(
  () =>
    props.showInfo !== false &&
    props.showValue !== false &&
    ((props.variant ?? 'line') === 'line' || (props.infoPlacement ?? 'outside') === 'inside'),
)
const resolvedInfoPlacement = computed(() => props.infoPlacement ?? 'outside')

const numSize = computed(() => {
  if (typeof props.size === 'number') return props.size
  if (props.size === 'sm') return props.variant === 'line' ? 4 : 32
  if (props.size === 'lg') return props.variant === 'line' ? 12 : 96
  return props.variant === 'line' ? 8 : 48
})

const numThickness = computed(() => {
  if (props.thickness !== undefined) return props.thickness
  if (typeof props.size === 'number' && props.variant === 'line') return props.size
  if (props.size === 'sm') return 4
  if (props.size === 'lg') return 8
  return props.variant === 'line' ? 8 : 4
})

const lineSteps = computed(() =>
  props.steps && props.steps > 0
    ? getLineStepsGeometry({
        value: props.value,
        min: props.min,
        max: props.max,
        steps: props.steps,
      })
    : null,
)

const circleSteps = computed(() =>
  props.steps && props.steps > 0 && (props.variant === 'circle' || props.variant === 'dashboard')
    ? getCircleStepsGeometry({
        value: props.value,
        min: props.min,
        max: props.max,
        size: numSize.value,
        thickness: numThickness.value,
        steps: props.steps,
        gap: props.gap,
      })
    : null,
)

const infoText = computed(() => {
  if (normalized.value.percentage !== null) {
    return `${Math.round(normalized.value.percentage * 100)}%`
  }
  return ''
})
</script>
<template>
  <!-- 1. Step Line -->
  <div
    v-if="steps && steps > 0 && variant !== 'circle' && variant !== 'dashboard'"
    data-slot="progress"
    data-variant="steps"
    :class="
      cn(progressStepLineContainerClassName, classNames?.root, $attrs.class as string | undefined)
    "
    :style="[styles?.root, $attrs.style as any]"
  >
    <div :class="cn(progressStepLineTrackClassName, classNames?.track)" :style="styles?.track">
      <span
        v-for="step in lineSteps?.steps"
        :key="step.index"
        data-slot="progress-step"
        :data-active="step.active ? 'true' : undefined"
        :class="cn(progressStepLineItemClassName, classNames?.step)"
        :style="[
          {
            background: step.active
              ? getLinearProgressBackground(color) || 'var(--primary)'
              : trackColor || 'var(--progress-remaining)',
          },
          styles?.step,
        ]"
      />
    </div>
    <span
      v-if="shouldShowInfo"
      :class="cn('text-sm font-medium', classNames?.info)"
      :style="styles?.info"
    >
      <slot name="info">
        <template v-if="format">{{
          format(
            normalized.percentage !== null ? Math.round(normalized.percentage * 100) : null,
            normalized.value,
          )
        }}</template>
        <template
          v-else-if="isSuccess && normalized.percentage !== null && normalized.percentage >= 1"
        >
          <span
            class="inline-flex size-4 items-center justify-center rounded-full bg-success text-[10px] text-white"
          >
            <CheckIcon class="size-3" />
          </span>
        </template>
        <template v-else>{{ infoText }}</template>
      </slot>
    </span>
  </div>

  <!-- 2. Step Circle -->
  <div
    v-else-if="circleSteps"
    data-slot="progress"
    data-variant="circle-steps"
    :class="
      cn(
        'relative inline-flex items-center justify-center',
        classNames?.root,
        $attrs.class as string | undefined,
      )
    "
    :style="[
      { width: `${circleSteps.size}px`, height: `${circleSteps.size}px` },
      styles?.root,
      $attrs.style as any,
    ]"
  >
    <svg
      :viewBox="`0 0 ${circleSteps.size} ${circleSteps.size}`"
      :width="circleSteps.size"
      :height="circleSteps.size"
      class="block shrink-0 -rotate-90"
    >
      <circle
        v-for="step in circleSteps.steps"
        :key="step.index"
        :cx="circleSteps.size / 2"
        :cy="circleSteps.size / 2"
        :r="circleSteps.radius"
        fill="none"
        :stroke="
          step.active
            ? typeof color === 'string'
              ? color
              : 'var(--primary)'
            : trackColor || 'var(--progress-remaining)'
        "
        :stroke-width="circleSteps.thickness"
        :stroke-dasharray="circleSteps.stepDasharray"
        :stroke-dashoffset="step.offset"
        :stroke-linecap="linecap"
      />
    </svg>
    <div
      v-if="shouldShowInfo"
      :class="
        cn(
          'absolute inset-0 flex items-center justify-center text-sm font-medium',
          classNames?.info,
        )
      "
      :style="styles?.info"
    >
      <slot name="info">
        <template v-if="format">{{
          format(
            normalized.percentage !== null ? Math.round(normalized.percentage * 100) : null,
            normalized.value,
          )
        }}</template>
        <template v-else-if="isSuccess"><CheckIcon class="size-6 text-success" /></template>
        <template v-else>{{ infoText }}</template>
      </slot>
    </div>
  </div>

  <!-- 3. Standard Circle / Dashboard -->
  <PrimitiveProgress
    v-else-if="variant === 'circle' || variant === 'dashboard'"
    :value="value"
    :min="min"
    :max="max"
    :variant="variant"
    :status="effectiveStatus"
    :size="numSize"
    :thickness="numThickness"
    :linecap="linecap"
    :track-linecap="trackLinecap"
    :color="color"
    :track-color="trackColor"
    :gap-degree="gapDegree"
    :gap-placement="gapPlacement"
    :class="
      cn(
        'relative inline-flex items-center justify-center',
        classNames?.root,
        $attrs.class as string | undefined,
      )
    "
    :style="[styles?.root, $attrs.style as any]"
  >
    <ProgressCircle
      :gap-degree="variant === 'dashboard' ? gapDegree : undefined"
      :class="classNames?.track"
      :style="styles?.track"
    >
      <ProgressCircleTrack :gap-degree="variant === 'dashboard' ? gapDegree : undefined" />
      <ProgressCircleRange
        :color="color"
        :gap-degree="variant === 'dashboard' ? gapDegree : undefined"
        :class="classNames?.range"
        :style="styles?.range"
      />
    </ProgressCircle>
    <div
      v-if="shouldShowInfo"
      :class="cn('absolute inset-0 flex items-center justify-center font-medium', classNames?.info)"
      :style="styles?.info"
    >
      <slot name="info">
        <template v-if="format">{{
          format(
            normalized.percentage !== null ? Math.round(normalized.percentage * 100) : null,
            normalized.value,
          )
        }}</template>
        <template v-else-if="isSuccess"><CheckIcon class="size-6 text-success" /></template>
        <template v-else>{{ infoText }}</template>
      </slot>
    </div>
  </PrimitiveProgress>

  <!-- 4. Standard Line -->
  <PrimitiveProgress
    v-else
    :value="value"
    :min="min"
    :max="max"
    variant="line"
    :status="effectiveStatus"
    :color="color"
    :track-color="trackColor"
    :class="cn('flex flex-col w-full', classNames?.root, $attrs.class as string | undefined)"
    :style="[styles?.root, $attrs.style as any]"
  >
    <div
      v-if="label || (true && resolvedInfoPlacement === 'top')"
      :class="cn(progressTopHeaderClassName, classNames?.label)"
    >
      <ProgressLabel v-if="label">{{ label }}</ProgressLabel>
      <span v-else />
      <span
        v-if="true && resolvedInfoPlacement === 'top'"
        :class="cn('text-muted-foreground', classNames?.info)"
        :style="styles?.info"
      >
        <slot name="info">
          <template v-if="format">{{
            format(
              normalized.percentage !== null ? Math.round(normalized.percentage * 100) : null,
              normalized.value,
            )
          }}</template>
          <template v-else>{{ infoText }}</template>
        </slot>
      </span>
    </div>
    <div :class="['flex w-full items-center', resolvedInfoPlacement === 'inside' ? 'relative' : undefined]">
      <ProgressTrack
        :class="cn('min-w-0 flex-1', trackLinecap === 'butt' ? 'rounded-none' : trackLinecap === 'square' ? 'rounded-[2px]' : 'rounded-full', classNames?.track)"
        :style="[{ height: `${numThickness}px` }, styles?.track]"
      >
        <ProgressRange :color="color" :class="classNames?.range" :style="styles?.range" />
      </ProgressTrack>
      <span
        v-if="true && resolvedInfoPlacement === 'outside'"
        :class="cn('ms-2 shrink-0 text-sm font-medium', classNames?.info)"
        :style="styles?.info"
      >
        <slot name="info">
          <template v-if="format">{{
            format(
              normalized.percentage !== null ? Math.round(normalized.percentage * 100) : null,
              normalized.value,
            )
          }}</template>
          <template
            v-else-if="isSuccess && normalized.percentage !== null && normalized.percentage >= 1"
          >
            <span
              class="inline-flex size-4 items-center justify-center rounded-full bg-success text-[10px] text-white"
            >
              <CheckIcon class="size-3" />
            </span>
          </template>
          <template v-else>{{ infoText }}</template>
        </slot>
      </span>
      <span
        v-if="true && resolvedInfoPlacement === 'inside'"
        :class="
          cn(
            'pointer-events-none absolute inset-0 z-10 flex items-center justify-center text-sm font-medium text-white',
            classNames?.info,
          )
        "
        :style="styles?.info"
      >
        <template v-if="format">{{
          format(
            normalized.percentage !== null ? Math.round(normalized.percentage * 100) : null,
            normalized.value,
          )
        }}</template>
        <template v-else>{{ infoText }}</template>
      </span>
    </div>
    <div
      v-if="true && resolvedInfoPlacement === 'bottom'"
      class="mt-1.5 flex w-full items-center justify-between text-sm"
    >
      <ProgressLabel v-if="label" :class="classNames?.label">{{ label }}</ProgressLabel
      ><span v-else />
      <span :class="cn('font-medium', classNames?.info)" :style="styles?.info">{{ infoText }}</span>
    </div>
  </PrimitiveProgress>
</template>
