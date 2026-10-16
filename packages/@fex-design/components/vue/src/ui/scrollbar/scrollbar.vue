<script setup lang="ts">
import { computed, useAttrs, useTemplateRef } from 'vue'
import type { ScrollbarScrollDetail } from '@fex-design/core/scrollbar/types'
import { resolveScrollbarOverflow } from '@fex-design/core/scrollbar/create-scrollbar-controller'
import { cn } from '@fex-design/utils'
import { ScrollbarRoot, ScrollbarViewport, ScrollbarBar, ScrollbarTrack, ScrollbarThumb, ScrollbarCorner } from '../../primitive/scrollbar'
import type { ScrollbarProps } from './types'

defineOptions({ name: 'Scrollbar', inheritAttrs: false })
// Preserve undefined through this wrapper so Root can resolve inherited/default Booleans.
const props = withDefaults(defineProps<ScrollbarProps>(), { dragScroll: undefined, showCorner: undefined })
const emit = defineEmits<{ scrollChange: [detail: ScrollbarScrollDetail] }>()
const attrs = useAttrs()
const root = useTemplateRef<InstanceType<typeof ScrollbarRoot>>('root')
const viewport = useTemplateRef<InstanceType<typeof ScrollbarViewport>>('viewport')
const axes = ['x', 'y'] as const
const resolved = computed(() => resolveScrollbarOverflow(props.viewportProps?.overflow, props.overflow))
const rootProps = computed(() => {
  const { classNames, styles, viewportProps, ...options } = props
  return options
})
defineExpose({
  element: computed(() => root.value?.element),
  viewportElement: computed(() => viewport.value?.element),
  controller: computed(() => root.value?.controller),
})
</script>
<template>
  <ScrollbarRoot v-bind="{ ...attrs, ...rootProps }" ref="root" @scroll-change="emit('scrollChange', $event)">
    <ScrollbarViewport v-bind="props.viewportProps" ref="viewport"
      :class="cn(props.classNames?.viewport, props.viewportProps?.class)"
      :style="[props.styles?.viewport, props.viewportProps?.style]">
      <slot />
    </ScrollbarViewport>
    <template v-for="axis in axes" :key="axis">
      <ScrollbarBar v-if="resolved[axis] === 'auto'" :axis="axis"
        :class="props.classNames?.[axis === 'x' ? 'barX' : 'barY']"
        :style="props.styles?.[axis === 'x' ? 'barX' : 'barY']">
        <ScrollbarTrack :axis="axis" :class="props.classNames?.[axis === 'x' ? 'trackX' : 'trackY']" :style="props.styles?.[axis === 'x' ? 'trackX' : 'trackY']">
          <ScrollbarThumb :axis="axis" :class="props.classNames?.[axis === 'x' ? 'thumbX' : 'thumbY']" :style="props.styles?.[axis === 'x' ? 'thumbX' : 'thumbY']" />
        </ScrollbarTrack>
      </ScrollbarBar>
    </template>
    <ScrollbarCorner v-if="resolved.x === 'auto' && resolved.y === 'auto'"
      :class="props.classNames?.corner" :style="props.styles?.corner" />
  </ScrollbarRoot>
</template>
