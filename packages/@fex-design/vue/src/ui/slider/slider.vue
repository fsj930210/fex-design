<script setup lang="ts">
import type { SliderChangeMeta, SliderMarkItem, SliderPart } from '@fex-design/core/slider/types'
import { computed, ref, useAttrs, type PropType, type StyleValue } from 'vue'
import {
  SliderMark,
  SliderRange,
  SliderRoot,
  SliderThumb,
  SliderTrack,
} from '../../primitive/slider/slider'
defineOptions({ name: 'Slider', inheritAttrs: false })
const props = defineProps({
  value: { type: [Number, Array] as PropType<number | number[]> },
  defaultValue: { type: [Number, Array] as PropType<number | number[]> },
  min: { type: Number, default: 0 },
  max: { type: Number, default: 100 },
  step: { type: Number as PropType<number | null>, default: 1 },
  marks: { type: Array as PropType<SliderMarkItem<unknown, StyleValue>[]>, default: () => [] },
  dots: Boolean,
  included: { type: Boolean, default: true },
  orientation: { type: String as PropType<'horizontal' | 'vertical'>, default: 'horizontal' },
  direction: { type: String as PropType<'ltr' | 'rtl'>, default: 'ltr' },
  reverse: Boolean,
  disabled: { type: [Boolean, Array] as PropType<boolean | boolean[]>, default: false },
  keyboard: { type: Boolean, default: true },
  minStepsBetweenThumbs: { type: Number, default: 0 },
  draggableRange: Boolean,
  editable: Boolean,
  minCount: { type: Number, default: 0 },
  maxCount: { type: Number, default: Number.POSITIVE_INFINITY },
  size: { type: String as PropType<'sm' | 'md' | 'lg'>, default: 'md' },
  classNames: {
    type: Object as PropType<Partial<Record<SliderPart, string>>>,
    default: () => ({}),
  },
  styles: {
    type: Object as PropType<Partial<Record<SliderPart, StyleValue>>>,
    default: () => ({}),
  },
})
const emit = defineEmits<{
  change: [value: number | number[], meta: SliderChangeMeta]
  end: [value: number | number[], meta: SliderChangeMeta]
  'update:value': [value: number | number[]]
}>()
const attrs = useAttrs()
const values = computed(() => (typeof props.value === 'number' ? [props.value] : props.value))
const defaults = computed(() =>
  typeof props.defaultValue === 'number' ? [props.defaultValue] : props.defaultValue,
)
const internalValues = ref<number[]>([...(defaults.value ?? [props.min])])
const currentValues = computed(() => values.value ?? internalValues.value)
const count = computed(() => currentValues.value.length)
const disabledThumbs = computed(() => (Array.isArray(props.disabled) ? props.disabled : []))
const dotValues = computed(() =>
  props.dots && props.step
    ? Array.from(
        { length: Math.floor((props.max - props.min) / props.step) + 1 },
        (_, index) => props.min + index * props.step!,
      )
    : [],
)
const returnValue = (value: number[]) =>
  typeof props.value === 'number' || typeof props.defaultValue === 'number' ? value[0]! : value
const handleChange = (value: number[], meta: SliderChangeMeta) => {
  if (value.length !== currentValues.value.length) internalValues.value = value
  emit('update:value', returnValue(value))
  emit('change', returnValue(value), meta)
}
</script>
<template>
  <SliderRoot
    v-bind="attrs"
    :value="values"
    :default-value="defaults"
    :min="props.min"
    :max="props.max"
    :step="props.step"
    :marks="props.marks.map((mark) => mark.value)"
    :orientation="props.orientation"
    :direction="props.direction"
    :reverse="props.reverse"
    :disabled="props.disabled === true"
    :disabled-thumbs="disabledThumbs"
    :keyboard="props.keyboard"
    :min-steps-between-thumbs="props.minStepsBetweenThumbs"
    :draggable-range="props.draggableRange"
    :editable="props.editable"
    :min-count="props.minCount"
    :max-count="props.maxCount"
    :size="props.size"
    :class="[attrs.class, props.classNames.root]"
    :style="[attrs.style, props.styles.root]"
    @change="handleChange"
    @end="(value, meta) => emit('end', returnValue(value), meta)"
  >
    <SliderTrack :class="props.classNames.track" :style="props.styles.track">
      <SliderRange
        v-if="props.included"
        :class="props.classNames.range"
        :style="props.styles.range"
      />
      <SliderMark v-for="dot in dotValues" :key="`dot-${dot}`" :value="dot" aria-hidden="true" />
      <SliderMark
        v-for="mark in props.marks"
        :key="mark.value"
        :value="mark.value"
        :class="[props.classNames.mark, mark.class]"
        :style="[props.styles.mark, mark.style]"
        >{{ mark.label }}</SliderMark
      >
    </SliderTrack>
    <SliderThumb
      v-for="index in count"
      :key="index"
      :index="index - 1"
      :disabled="disabledThumbs[index - 1]"
      :class="props.classNames.thumb"
      :style="props.styles.thumb"
      :aria-label="`滑块 ${index}`"
    />
  </SliderRoot>
</template>
