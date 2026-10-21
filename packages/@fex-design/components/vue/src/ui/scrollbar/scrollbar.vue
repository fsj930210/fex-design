<script setup lang="ts">
import { computed, useAttrs, useTemplateRef } from 'vue'
import type { ScrollbarScrollDetail } from '@fex-design/core/scrollbar/types'
import { resolveScrollbarOverflow } from '@fex-design/core/scrollbar/create-scrollbar-controller'
import { cn } from '@fex-design/utils'
import {
  ScrollbarRoot,
  ScrollbarViewport,
  ScrollbarBar,
  ScrollbarTrack,
  ScrollbarThumb,
  ScrollbarCorner,
} from '../../primitive/scrollbar'
import type { ScrollbarProps } from './types'

defineOptions({ name: 'Scrollbar', inheritAttrs: false })
// Preserve undefined through this wrapper so Root can resolve inherited/default Booleans.
const props = withDefaults(defineProps<ScrollbarProps>(), {
  dragScroll: undefined,
  showCorner: undefined,
})
const emit = defineEmits<{ scrollChange: [detail: ScrollbarScrollDetail] }>()
const attrs = useAttrs()
const root = useTemplateRef<InstanceType<typeof ScrollbarRoot>>('root')
const viewport = useTemplateRef<InstanceType<typeof ScrollbarViewport>>('viewport')
const axes = ['x', 'y'] as const
const resolved = computed(() =>
  resolveScrollbarOverflow(props.viewportProps?.overflow, props.overflow),
)
const rootProps = computed(() => {
  const {
    horizontalBarProps,
    verticalBarProps,
    horizontalTrackProps,
    verticalTrackProps,
    horizontalThumbProps,
    verticalThumbProps,
    cornerProps,
    classNames,
    styles,
    viewportProps,
    ...options
  } = props
  return options
})
defineExpose({
  element: computed(() => root.value?.element),
  viewportElement: computed(() => viewport.value?.element),
  controller: computed(() => root.value?.controller),
})
</script>
<template>
  <ScrollbarRoot
    v-bind="{ ...attrs, ...rootProps }"
    ref="root"
    @scroll-change="emit('scrollChange', $event)"
  >
    <ScrollbarViewport
      v-bind="props.viewportProps"
      ref="viewport"
      :class="cn(props.classNames?.viewport, props.viewportProps?.class)"
      :style="[props.styles?.viewport, props.viewportProps?.style]"
    >
      <slot />
    </ScrollbarViewport>
    <template v-for="axis in axes" :key="axis">
      <ScrollbarBar
        v-bind="axis === 'x' ? props.horizontalBarProps : props.verticalBarProps"
        v-if="resolved[axis] === 'auto'"
        :axis="axis"
        :class="
          cn(
            props.classNames?.[axis === 'x' ? 'barX' : 'barY'],
            (axis === 'x' ? props.horizontalBarProps : props.verticalBarProps)?.class as
              string | undefined,
          )
        "
        :style="[
          props.styles?.[axis === 'x' ? 'barX' : 'barY'],
          (axis === 'x' ? props.horizontalBarProps : props.verticalBarProps)?.style,
        ]"
      >
        <ScrollbarTrack
          v-bind="axis === 'x' ? props.horizontalTrackProps : props.verticalTrackProps"
          :axis="axis"
          :class="
            cn(
              props.classNames?.[axis === 'x' ? 'trackX' : 'trackY'],
              (axis === 'x' ? props.horizontalTrackProps : props.verticalTrackProps)?.class as
                string | undefined,
            )
          "
          :style="[
            props.styles?.[axis === 'x' ? 'trackX' : 'trackY'],
            (axis === 'x' ? props.horizontalTrackProps : props.verticalTrackProps)?.style,
          ]"
        >
          <ScrollbarThumb
            v-bind="axis === 'x' ? props.horizontalThumbProps : props.verticalThumbProps"
            :axis="axis"
            :class="
              cn(
                props.classNames?.[axis === 'x' ? 'thumbX' : 'thumbY'],
                (axis === 'x' ? props.horizontalThumbProps : props.verticalThumbProps)?.class as
                  string | undefined,
              )
            "
            :style="[
              props.styles?.[axis === 'x' ? 'thumbX' : 'thumbY'],
              (axis === 'x' ? props.horizontalThumbProps : props.verticalThumbProps)?.style,
            ]"
          />
        </ScrollbarTrack>
      </ScrollbarBar>
    </template>
    <ScrollbarCorner
      v-bind="props.cornerProps"
      v-if="resolved.x === 'auto' && resolved.y === 'auto'"
      :class="cn(props.classNames?.corner, props.cornerProps?.class as string | undefined)"
      :style="[props.styles?.corner, props.cornerProps?.style]"
    />
  </ScrollbarRoot>
</template>
