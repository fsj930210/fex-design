<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { formLegendClassName } from '@fex-design/components-styles/form'
import { useRootContext } from './context'
defineOptions({ name: 'FormLegend', inheritAttrs: false })
useRootContext()
const element = useTemplateRef<HTMLLegendElement>('element')
defineExpose({ element })
</script>
<template>
  <legend
    ref="element"
    v-bind="$attrs"
    data-slot="form-legend"
    :class="[formLegendClassName, $attrs.class]"
  >
    <slot />
  </legend>
</template>
