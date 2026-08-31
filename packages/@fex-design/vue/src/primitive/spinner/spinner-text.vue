<script setup lang="ts">
import { spinnerTextClassName } from '@fex-design/styles/spinner'
import { cn } from '@fex/utils'
import { useAttrs } from 'vue'
defineOptions({ name: 'SpinnerText', inheritAttrs: false })
const attrs = useAttrs()
</script>
<template>
  <span
    v-bind="attrs"
    data-slot="spinner-text"
    :class="cn(spinnerTextClassName, attrs.class as string | undefined)"
    ><slot
  /></span>
</template>
