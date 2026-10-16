<script setup lang="ts">
import { usePickerAppearance } from './appearance-context'
const appearance = usePickerAppearance()
import { getVisibleRangePanelViewDates } from '@fex-design/core/date-picker/panel'
import { datePickerPanelsClassName } from '@fex-design/components-styles/date-picker'
import { cn } from '@fex-design/utils'
import { computed, useAttrs } from 'vue'
import { useRangePickerContext } from './context'
import RangePickerPanel from './range-picker-panel.vue'

defineOptions({ name: 'RangePickerPanelGroup', inheritAttrs: false })
const attrs = useAttrs()
function nativeAttrs() { const { onMouseleave, ...rest } = attrs; return rest }
function leave(event: MouseEvent) {
  const handlers = attrs.onMouseleave
  for (const handler of Array.isArray(handlers) ? handlers : [handlers]) if (typeof handler === 'function') handler(event)
  if (!event.defaultPrevented) context.setHoverValue(null)
}
const props = defineProps<{ class?: string; panelCount?: 1 | 2 }>()
const context = useRangePickerContext('RangePickerPanelGroup')
const visibleDates = computed(() => getVisibleRangePanelViewDates(context.viewDate.value, context.panel.value, props.panelCount))
</script>

<template>
  <div v-bind="nativeAttrs()" :role="attrs.role ?? 'group'" data-slot="range-picker-panel-group"
    :class="cn(datePickerPanelsClassName, appearance().classNames?.panelGroup, props.class)" :style="[appearance().styles?.panelGroup, attrs.style]"
    @mouseleave="leave"
  >
    <slot v-if="$slots.default" />
    <template v-else>
      <RangePickerPanel
        v-for="date in visibleDates"
        :key="date.toString()"
        :panel-view-date="date"
      />
    </template>
  </div>
</template>
