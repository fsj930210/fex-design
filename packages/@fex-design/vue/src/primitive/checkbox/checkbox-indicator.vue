<script setup lang="ts">
import {
  checkboxCheckIconClassName,
  checkboxIndicatorClassName,
  checkboxMinusIconClassName,
} from '@fex-design/styles/checkbox'
import { cn } from '@fex/utils'
import { useAttrs } from 'vue'
import { CheckIcon } from '../../icon/check'
import { MinusIcon } from '../../icon/minus'
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
