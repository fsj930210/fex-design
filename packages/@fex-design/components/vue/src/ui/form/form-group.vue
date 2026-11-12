<script setup lang="ts">
import { formGroupClassName, formLegendClassName } from '@fex-design/components-styles/form'
import { useRootContext } from '../../primitive/form/context'
defineOptions({ name: 'FormGroup', inheritAttrs: false })
useRootContext()
const props = defineProps<{
  legend?: unknown
  classNames?: { root?: string; legend?: string }
  styles?: { root?: Record<string, unknown>; legend?: Record<string, unknown> }
}>()
</script>
<template>
  <fieldset
    v-bind="$attrs"
    data-slot="form-group"
    :class="[formGroupClassName, props.classNames?.root, $attrs.class]"
    :style="[props.styles?.root, $attrs.style]"
  >
    <legend
      v-if="props.legend !== undefined"
      data-slot="form-legend"
      :class="[formLegendClassName, props.classNames?.legend]"
      :style="props.styles?.legend"
    >
      {{ props.legend }}
    </legend>
    <slot />
  </fieldset>
</template>
