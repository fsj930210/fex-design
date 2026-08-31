<script setup lang="ts">
import type {
  SpinnerContainerOptions,
  SpinnerOptions,
  SpinnerStyles,
} from '@fex-design/core/spinner/types'
import { spinnerContainerClassName } from '@fex-design/styles/spinner'
import { cn } from '@fex/utils'
import type { StyleValue } from 'vue'
import { computed, useAttrs } from 'vue'
import Spinner from '../../primitive/spinner/spinner.vue'
import PrimitiveSpinnerContainer from '../../primitive/spinner/spinner-container.vue'
import SpinnerOverlay from '../../primitive/spinner/spinner-overlay.vue'
import SpinnerText from '../../primitive/spinner/spinner-text.vue'
defineOptions({ name: 'SpinnerContainer', inheritAttrs: false })
const props = defineProps<
  SpinnerContainerOptions & SpinnerOptions & { styles?: SpinnerStyles<StyleValue> }
>()
const attrs = useAttrs()
const hasText = computed(() => Boolean(props.text))
</script>
<template>
  <Spinner
    v-if="props.spinning === undefined"
    v-bind="attrs"
    :size="props.size"
    :class="cn(attrs.class as string | undefined, props.classNames?.spinner)"
    :style="props.styles?.spinner"
    ><slot name="indicator"
  /></Spinner>
  <PrimitiveSpinnerContainer
    v-else
    v-bind="attrs"
    :aria-busy="props.spinning"
    :class="
      cn(spinnerContainerClassName, attrs.class as string | undefined, props.classNames?.root)
    "
    :style="props.styles?.root"
  >
    <slot />
    <SpinnerOverlay
      v-if="props.spinning"
      :class="cn(props.classNames?.overlay, hasText && 'flex-col')"
      :style="props.styles?.overlay"
    >
      <Spinner :size="props.size" :class="props.classNames?.spinner" :style="props.styles?.spinner"
        ><slot name="indicator"
      /></Spinner>
      <SpinnerText v-if="props.text" :class="props.classNames?.text" :style="props.styles?.text">{{
        props.text
      }}</SpinnerText>
    </SpinnerOverlay>
  </PrimitiveSpinnerContainer>
</template>
