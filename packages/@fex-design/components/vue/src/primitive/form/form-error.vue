<script setup lang="ts">
import { useTemplateRef, computed, useId, useSlots, watchEffect } from 'vue'
import { getFormErrorMessages } from '@fex-design/core/form/error-messages'
import { formErrorClassName } from '@fex-design/components-styles/form'
import { useFieldPresentation } from './use-form-field'
defineOptions({ name: 'FormError', inheritAttrs: false })
const { association, presentation } = useFieldPresentation()
const props = defineProps<{ id?: string }>()
const slots = useSlots()
const generated = useId()
const id = () => props.id ?? `error-${generated}`
const messages = computed(() => {
  const normalized = getFormErrorMessages(presentation.value.errors)
  return normalized.length > 0
    ? normalized
    : presentation.value.errors
        .filter(
          (error): error is string | number =>
            typeof error === 'string' || typeof error === 'number',
        )
        .map(String)
})
const visible = computed(() => messages.value.length > 0)
// Register feedback only while its rendered error branch exists.
watchEffect((cleanup) => {
  if (!visible.value) return
  const unregister = association.register('errors', id())
  if (typeof unregister === 'function') cleanup(unregister)
})
const element = useTemplateRef<HTMLDivElement>('element')
defineExpose({ element })
</script>
<template>
  <div
    ref="element"
    v-if="visible"
    v-bind="$attrs"
    :id="id()"
    aria-live="polite"
    data-slot="form-error"
    :class="[formErrorClassName, $attrs.class]"
  >
    <slot :errors="presentation.errors"
      ><div v-for="message in messages" :key="message">{{ message }}</div></slot
    >
  </div>
</template>
