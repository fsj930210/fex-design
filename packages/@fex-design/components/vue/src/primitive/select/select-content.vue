<script setup lang="ts">
import { selectContentClassName } from '@fex-design/components-styles/select'
import { cn } from '@fex-design/utils'
import { computed } from 'vue'
import PopoverContent from '../popover/popover-content.vue'
import PopoverPortal from '../popover/popover-portal.vue'
import SelectList from './select-list.vue'

const props = defineProps<{ class?: string }>()
const className = computed(() => cn(selectContentClassName, props.class))
</script>
<template>
  <PopoverPortal
    ><PopoverContent
      :class="className"
      :style="{
        width: 'var(--floating-reference-width)',
        maxWidth: 'var(--floating-available-width)',
      }"
      ><slot><SelectList><template #option="slotProps"><slot name="option" v-bind="slotProps">{{ slotProps.option.label }}</slot></template><template #empty><slot name="empty" /></template><template #loading><slot name="loading" /></template></SelectList></slot><slot name="footer" /></PopoverContent
  ></PopoverPortal>
</template>
