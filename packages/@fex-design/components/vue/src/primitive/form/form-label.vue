<script setup lang="ts">
import { useId, useTemplateRef, watchEffect } from 'vue'
import { formLabelClassName } from '@fex-design/components-styles/form'
import { useCoreStore } from '../../composables/use-core-store'
import { useFieldContext } from './context'
defineOptions({ name: 'FormLabel', inheritAttrs: false })
const props = defineProps<{ required?: boolean; id?: string }>()
const { association } = useFieldContext()
const generated = useId()
const id = () => props.id ?? `label-${generated}`
// Naming is shared with composite controls that cannot use native label-for behavior.
watchEffect((cleanup) => cleanup(association.register('labels', id())))
const links = useCoreStore(association)
// Required association follows the mounted label and is cleaned up with its scope.
watchEffect((cleanup) => {
  if (props.required) cleanup(association.require())
})
const element = useTemplateRef<HTMLLabelElement>('element')
defineExpose({ element })
</script>
<template>
  <label
    ref="element"
    v-bind="$attrs"
    :id="id()"
    :for="$attrs.for ?? links.controlId"
    data-slot="form-label"
    :data-required="required || undefined"
    :class="[formLabelClassName, $attrs.class]"
    ><slot
  /></label>
</template>
