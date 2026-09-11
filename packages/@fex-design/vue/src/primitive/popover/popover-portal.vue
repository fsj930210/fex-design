<script setup lang="ts">
import type { PopoverPortalOptions } from '@fex-design/core/popover/types'
import { computed } from 'vue'
import { usePopoverContext } from './context'

defineOptions({ name: 'PopoverPortal' })

const props = defineProps<PopoverPortalOptions>()

const { snapshot } = usePopoverContext('PopoverPortal')
const popupContainer = computed(() => props.container ?? snapshot.value.popupContainer)
const shouldRender = computed(() => snapshot.value.mounted && popupContainer.value != null)
</script>

<template>
  <Teleport v-if="shouldRender" :to="popupContainer">
    <slot />
  </Teleport>
</template>
