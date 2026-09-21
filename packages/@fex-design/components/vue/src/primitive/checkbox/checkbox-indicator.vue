<script setup lang="ts">
import {
  checkboxCheckIconClassName,
  checkboxIndicatorClassName,
  checkboxMinusIconClassName,
} from '@fex-design/components-styles/checkbox'
import { cn } from '@fex-design/utils'
import { useAttrs } from 'vue'
import { CheckIcon } from '@fex-design/vue/icons/check'
import { MinusIcon } from '@fex-design/vue/icons/minus'
defineOptions({ name: 'CheckboxIndicator', inheritAttrs: false })
const attrs = useAttrs()
</script>
<template>
  <span
    v-bind="attrs"
    aria-hidden="true"
    data-slot="checkbox-indicator"
    :class="cn(checkboxIndicatorClassName, attrs.class as string | undefined)"
    ><slot
      ><CheckIcon data-slot="checkbox-check" :class="checkboxCheckIconClassName" /><MinusIcon
        data-slot="checkbox-minus"
        :class="checkboxMinusIconClassName" /></slot
  ></span>
</template>
