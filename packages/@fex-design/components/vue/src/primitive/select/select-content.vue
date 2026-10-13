<script setup lang="ts">
import { selectContentClassName } from '@fex-design/components-styles/select'
import { cn } from '@fex-design/utils'
import { computed, h, useSlots } from 'vue'
import { useSelect } from './use-select'
import PopoverContent from '../popover/popover-content.vue'
import PopoverPortal from '../popover/popover-portal.vue'
import SelectList from './select-list.vue'

const props = defineProps<{ class?: string }>()
const slots = useSlots()
const select = useSelect('SelectContent')
const close = () => select.controller.close()
// A native scoped slot receives a renderable menu component to wrap or replace.
const menu = () => slots.default?.() ?? h(SelectList, {}, {
  option: slots.option, empty: slots.empty, loading: slots.loading,
})
const className = computed(() => cn(selectContentClassName, props.class))
</script>
<template>
  <PopoverPortal
    ><PopoverContent
      :class="className"
      :style="{
        maxWidth: 'var(--floating-available-width)',
      }"
      ><slot name="popup" :menu="menu" :close="close"><component :is="menu" /></slot><slot name="footer" /></PopoverContent
  ></PopoverPortal>
</template>
