<script setup lang="ts">
import { spinnerOverlayClassName } from '@fex-design/styles/spinner'
import { cn } from '@fex/utils'
import { useAttrs } from 'vue'
defineOptions({ name: 'SpinnerOverlay', inheritAttrs: false })
const attrs = useAttrs()
</script>
<template>
  <div
    v-bind="attrs"
    data-slot="spinner-overlay"
    :class="cn(spinnerOverlayClassName, attrs.class as string | undefined)"
  >
    <slot />
  </div>
</template>
