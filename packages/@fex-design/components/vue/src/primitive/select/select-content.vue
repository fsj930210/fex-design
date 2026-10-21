<script setup lang="ts">
import { selectContentClassName } from '@fex-design/components-styles/select'
import { cn } from '@fex-design/utils'
import { computed, h, useSlots, type StyleValue } from 'vue'
import { useSelect } from './use-select'
import PopoverContent from '../popover/popover-content.vue'
import PopoverPortal from '../popover/popover-portal.vue'
import SelectList from './select-list.vue'

const props = defineProps<{
  class?: string | undefined
  style?: StyleValue | undefined
  popoverContentProps?: InstanceType<typeof PopoverContent>['$props'] | undefined
  portalProps?: InstanceType<typeof PopoverPortal>['$props'] | undefined
  listProps?: InstanceType<typeof SelectList>['$props'] | undefined
}>()
const slots = useSlots()
const select = useSelect('SelectContent')
const close = () => select.controller.close()
// A native scoped slot receives a renderable menu component to wrap or replace.
const menu = () =>
  slots.default?.() ??
  h(SelectList, props.listProps ?? {}, {
    option: slots.option,
    empty: slots.empty,
    loading: slots.loading,
  })
const className = computed(() =>
  cn(selectContentClassName, props.class, props.popoverContentProps?.class as string | undefined),
)
</script>
<template>
  <PopoverPortal v-bind="props.portalProps"
    ><PopoverContent
      v-bind="props.popoverContentProps"
      :class="className"
      :style="[
        { maxWidth: 'var(--floating-available-width)' },
        props.style,
        props.popoverContentProps?.style,
      ]"
      ><slot name="popup" :menu="menu" :close="close"><component :is="menu" /></slot
      ><slot name="footer" /></PopoverContent
  ></PopoverPortal>
</template>
