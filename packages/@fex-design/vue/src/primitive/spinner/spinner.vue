<script setup lang="ts">
import { spinnerClassName } from '@fex-design/styles/spinner'
import type { SpinnerOptions } from '@fex-design/core/spinner/types'
import { cn } from '@fex/utils'
import { useAttrs } from 'vue'
import LoadingIcon from '../../icon/loading-icon.vue'
defineOptions({ name: 'Spinner', inheritAttrs: false })
const props = defineProps<SpinnerOptions>()
const attrs = useAttrs()
</script>
<template>
  <span
    v-bind="attrs"
    data-slot="spinner"
    role="status"
    :class="cn(spinnerClassName({ size: props.size }), attrs.class as string | undefined)"
    ><slot><LoadingIcon class="animate-spin" /></slot
  ></span>
</template>
