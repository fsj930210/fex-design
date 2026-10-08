<script setup lang="ts">
import {
  progressStepLineContainerClassName, progressStepLineItemClassName,
  progressStepLineTrackClassName, progressTopHeaderClassName,
} from '@fex-design/components-styles/progress'
import {
  Progress as PrimitiveProgress, ProgressCircle, ProgressCircleRange, ProgressCircleTrack,
  ProgressLabel, ProgressRange, ProgressTrack,
} from '@fex-design/vue/primitive/progress'
import { cn } from '@fex-design/utils'
import { computed, useAttrs, useId, useTemplateRef, type StyleValue } from 'vue'
import ProgressInfo from './progress-info.vue'
import type { ProgressProps } from './types'
import { useProgress } from './use-progress'

defineOptions({ name: 'Progress', inheritAttrs: false })
const props = withDefaults(defineProps<ProgressProps>(), {
  value: 0, min: 0, max: 100, variant: 'line', gap: 2, linecap: 'round',
  gapDegree: 75, gapPlacement: 'bottom', infoPlacement: 'outside',
  showInfo: undefined, showValue: undefined,
})
const attrs = useAttrs()
const model = useProgress(props)
const { rangeLayout, effectiveValue, normalized, status, showInfo, size, thickness, isCircle, lineSteps, circleSteps,
  gradient, rangeStyle, trackStyle, stepColor, activeColor } = model
const gradientId = useId().replace(/:/g, '')
// attrs always contains the latest values but is not reactive; merge it during render.
const rootStyle = (): StyleValue => [props.styles?.root, attrs.style as StyleValue]
const root = useTemplateRef<HTMLDivElement | { element: HTMLDivElement }>('root')
const element = computed(() => root.value && ('element' in root.value ? root.value.element : root.value))
defineExpose({ element })
</script>

<template>
  <div v-if="lineSteps" ref="root" v-bind="attrs" data-slot="progress" data-variant="steps"
    :class="cn(progressStepLineContainerClassName, classNames?.root, attrs.class as string)"
    :style="rootStyle()">
    <div :class="cn(progressStepLineTrackClassName, classNames?.track)" :style="styles?.track">
      <span v-for="step in lineSteps.steps" :key="step.index" data-slot="progress-step"
        :data-active="step.active ? 'true' : undefined"
        :class="cn(progressStepLineItemClassName, classNames?.step)"
        :style="[{ background: step.active ? activeColor : (trackColor ?? 'var(--progress-remaining)') }, styles?.step]" />
    </div>
    <span v-if="showInfo" :class="cn('text-sm font-medium', classNames?.info)" :style="styles?.info">
      <ProgressInfo :percentage="normalized.percentage" :value="normalized.value" :status="status" :variant="variant" :format="format">
        <template v-if="$slots.info" #default="scope"><slot name="info" v-bind="scope" /></template>
      </ProgressInfo>
    </span>
  </div>
  <div v-else-if="circleSteps" ref="root" v-bind="attrs" data-slot="progress" data-variant="circle-steps"
    :class="cn('relative inline-flex items-center justify-center', classNames?.root, attrs.class as string)"
    :style="[{ width: `${circleSteps.size}px`, height: `${circleSteps.size}px` }, rootStyle()]">
    <svg :viewBox="`0 0 ${circleSteps.size} ${circleSteps.size}`" :width="circleSteps.size" :height="circleSteps.size"
      class="block shrink-0 -rotate-90">
      <circle v-for="step in circleSteps.steps" :key="step.index"
        :cx="circleSteps.size / 2" :cy="circleSteps.size / 2" :r="circleSteps.radius" fill="none"
        :stroke="step.active ? stepColor(step.index) : (trackColor ?? 'var(--progress-remaining)')"
        :stroke-width="circleSteps.thickness" :stroke-dasharray="circleSteps.stepDasharray"
        :stroke-dashoffset="step.offset" :stroke-linecap="linecap" />
    </svg>
    <div v-if="showInfo" :class="cn('absolute inset-0 flex items-center justify-center text-sm font-medium', classNames?.info)" :style="styles?.info">
      <ProgressInfo :percentage="normalized.percentage" :value="normalized.value" :status="status" :variant="variant" :format="format">
        <template v-if="$slots.info" #default="scope"><slot name="info" v-bind="scope" /></template>
      </ProgressInfo>
    </div>
  </div>
  <PrimitiveProgress v-else-if="isCircle" ref="root" v-bind="attrs" :value="effectiveValue" :min="min" :max="max"
    :variant="variant" :status="status" :size="size" :thickness="thickness"
    :class="cn('relative inline-flex items-center justify-center', classNames?.root, attrs.class as string)" :style="rootStyle()">
    <ProgressCircle :gap-degree="variant === 'dashboard' ? gapDegree : undefined"
      :rotation="variant === 'dashboard' && gapPlacement === 'top' ? 315 : undefined"
      :class="classNames?.track" :style="styles?.track">
      <defs v-if="gradient">
        <linearGradient :id="gradientId" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop v-for="stop in gradient" :key="stop.offset" :offset="stop.offset" :stop-color="stop.color" />
        </linearGradient>
      </defs>
      <ProgressCircleTrack :gap-degree="variant === 'dashboard' ? gapDegree : undefined" :track-linecap="trackLinecap" />
      <ProgressCircleRange :stroke="typeof color === 'string' ? color : gradient ? `url(#${gradientId})` : undefined"
        :linecap="linecap" :gap-degree="variant === 'dashboard' ? gapDegree : undefined"
        :class="classNames?.range" :style="styles?.range" />
    </ProgressCircle>
    <div v-if="showInfo" :class="cn('absolute inset-0 flex items-center justify-center font-medium', classNames?.info)" :style="styles?.info">
      <ProgressInfo :percentage="normalized.percentage" :value="normalized.value" :status="status" :variant="variant" :format="format">
        <template v-if="$slots.info" #default="scope"><slot name="info" v-bind="scope" /></template>
      </ProgressInfo>
    </div>
  </PrimitiveProgress>
  <PrimitiveProgress v-else ref="root" v-bind="attrs" :value="effectiveValue" :min="min" :max="max"
    variant="line" :status="status" :thickness="thickness"
    :class="cn('flex flex-col w-full', classNames?.root, attrs.class as string)" :style="rootStyle()">
    <div v-if="infoPlacement !== 'bottom' && (label || $slots.label || (showInfo && infoPlacement === 'top'))"
      :class="cn(progressTopHeaderClassName, classNames?.label)">
      <ProgressLabel v-if="label || $slots.label"><slot name="label">{{ label }}</slot></ProgressLabel><span v-else />
      <span v-if="showInfo && infoPlacement === 'top'" :class="cn('text-muted-foreground', classNames?.info)" :style="styles?.info">
        <ProgressInfo :percentage="normalized.percentage" :value="normalized.value" :status="status" :variant="variant" :format="format">
          <template v-if="$slots.info" #default="scope"><slot name="info" v-bind="scope" /></template>
        </ProgressInfo>
      </span>
    </div>
    <div :class="cn('flex w-full items-center', infoPlacement === 'inside' && 'relative')">
      <ProgressTrack :class="cn('min-w-0 flex-1', classNames?.track)" :style="trackStyle">
        <template v-if="rangeLayout"><ProgressRange v-for="range in rangeLayout.ranges" :key="range.index" :value="range.value" :offset="range.offset"
          :class="classNames?.range" :style="{ borderRadius: '0', background: range.color ?? 'var(--primary)', ...styles?.range }" /></template>
        <ProgressRange v-else :class="classNames?.range" :style="rangeStyle" />
      </ProgressTrack>
      <span v-if="showInfo && infoPlacement === 'outside'" :class="cn('ms-2 shrink-0 text-sm font-medium', classNames?.info)" :style="styles?.info">
        <ProgressInfo :percentage="normalized.percentage" :value="normalized.value" :status="status" :variant="variant" :format="format">
          <template v-if="$slots.info" #default="scope"><slot name="info" v-bind="scope" /></template>
        </ProgressInfo>
      </span>
      <span v-if="showInfo && infoPlacement === 'inside'" :class="cn('pointer-events-none absolute inset-0 z-10 flex items-center justify-center text-sm font-medium text-white', classNames?.info)" :style="styles?.info">
        <ProgressInfo :percentage="normalized.percentage" :value="normalized.value" :status="status" :variant="variant" :format="format">
          <template v-if="$slots.info" #default="scope"><slot name="info" v-bind="scope" /></template>
        </ProgressInfo>
      </span>
    </div>
    <div v-if="showInfo && infoPlacement === 'bottom'" class="mt-1.5 flex w-full items-center justify-between text-sm">
      <ProgressLabel v-if="label || $slots.label" :class="classNames?.label"><slot name="label">{{ label }}</slot></ProgressLabel><span v-else />
      <span :class="cn('font-medium', classNames?.info)" :style="styles?.info">
        <ProgressInfo :percentage="normalized.percentage" :value="normalized.value" :status="status" :variant="variant" :format="format">
          <template v-if="$slots.info" #default="scope"><slot name="info" v-bind="scope" /></template>
        </ProgressInfo>
      </span>
    </div>
  </PrimitiveProgress>
</template>
