<script setup lang="ts">
import { useTemplateRef, useId, watchEffect } from 'vue'
import { formDescriptionClassName } from '@fex-design/components-styles/form'
import { useFieldContext } from './context'
defineOptions({ name: 'FormDescription', inheritAttrs: false })
const props = defineProps<{ id?: string }>()
const generated = useId()
const { association } = useFieldContext()
const id = () => props.id ?? `description-${generated}`
// Register only mounted description nodes and update their explicit ID.
watchEffect((cleanup) => cleanup(association.register('descriptions', id())))
const element = useTemplateRef<HTMLParagraphElement>('element')
defineExpose({ element })
</script>
<template>
  <p
    ref="element"
    v-bind="$attrs"
    :id="id()"
    data-slot="form-description"
    :class="[formDescriptionClassName, $attrs.class]"
  >
    <slot />
  </p>
</template>
