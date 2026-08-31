<script setup lang="ts">
import { spinnerContainerClassName } from '@fex-design/styles/spinner'
import { cn } from '@fex/utils'
import { useAttrs } from 'vue'
import PrimitiveSpinner from '../../primitive/spinner/spinner.vue'
import SpinnerContainer from '../../primitive/spinner/spinner-container.vue'
import SpinnerText from '../../primitive/spinner/spinner-text.vue'
defineOptions({ name: 'Spinner', inheritAttrs: false })
withDefaults(defineProps<{ spinning?: boolean; text?: string; size?: 'sm' | 'md' | 'lg' }>(), {
  spinning: false,
})
const attrs = useAttrs()
</script>
<template>
  <template v-if="!spinning"><slot /></template>
  <SpinnerContainer
    v-else
    v-bind="attrs"
    :class="cn(spinnerContainerClassName, text && 'flex-col', attrs.class as string | undefined)"
  >
    <PrimitiveSpinner :size="size"><slot name="indicator" /></PrimitiveSpinner>
    <SpinnerText v-if="text">{{ text }}</SpinnerText>
  </SpinnerContainer>
</template>
