<script setup lang="ts">
import { createTooltip, type TooltipOptions } from '@fex-design/core/tooltip/create-tooltip'
import { shallowEqualObject } from '@fex-design/utils'
import { computed, onBeforeUnmount, provide, ref, shallowRef, useId, watchEffect } from 'vue'
import { useCoreStore } from '@fex-design/vue/composables/use-core-store'
import { tooltipKey } from './context'

type TooltipRootProps = Omit<TooltipOptions, 'onOpenChange'>
const props = withDefaults(defineProps<TooltipRootProps>(), { defaultOpen: false, open: undefined })
const emit = defineEmits<{
  openChange: [open: boolean, info: Parameters<NonNullable<TooltipOptions['onOpenChange']>>[1]]
}>()
const controlled = computed(() => props.open !== undefined)
const localOpen = ref(props.defaultOpen)
const triggerElement = shallowRef<HTMLElement | null>(null)
function handleOpenChange(
  open: boolean,
  info: Parameters<NonNullable<TooltipOptions['onOpenChange']>>[1],
) {
  if (!controlled.value) localOpen.value = open
  emit('openChange', open, info)
}
function createOptions(): TooltipOptions {
  return {
    ...props,
    open: controlled.value ? Boolean(props.open) : localOpen.value,
    onOpenChange: handleOpenChange,
  }
}
let latestOptions = createOptions()
const overlay = createTooltip(latestOptions)
const snapshot = useCoreStore(overlay)
provide(tooltipKey, {
  contentId: `fex-tooltip-${useId().replaceAll(':', '')}`,
  overlay,
  snapshot,
  triggerElement,
})
watchEffect(() => {
  const next = createOptions()
  if (!shallowEqualObject(latestOptions, next)) {
    latestOptions = next
    overlay.setOptions(next)
  }
})
onBeforeUnmount(() => overlay.destroy())
</script>
<template><slot /></template>
