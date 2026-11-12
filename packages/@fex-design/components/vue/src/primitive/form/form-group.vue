<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { formGroupClassName } from '@fex-design/components-styles/form'
import { useRootContext } from './context'
defineOptions({ name: 'FormGroup', inheritAttrs: false })
useRootContext()
const element = useTemplateRef<HTMLFieldSetElement>('element')
defineExpose({ element })
</script>
<template>
  <fieldset
    ref="element"
    v-bind="$attrs"
    data-slot="form-group"
    :class="[formGroupClassName, $attrs.class]"
  >
    <slot />
  </fieldset>
</template>
