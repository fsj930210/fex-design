<script setup lang="ts">
import { spinnerContainerClassName } from '@fex-design/styles/spinner'
import { cn } from '@fex/utils'
import { useAttrs } from 'vue'
defineOptions({ name: 'SpinnerContainer', inheritAttrs: false })
const attrs = useAttrs()
</script>
<template>
  <div
    v-bind="attrs"
    data-slot="spinner-container"
    :class="cn(spinnerContainerClassName, attrs.class as string | undefined)"
  >
    <slot />
  </div>
</template>
