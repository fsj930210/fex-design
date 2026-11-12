<script setup lang="ts">
import { provide, nextTick, useTemplateRef } from 'vue'
import type { AnyFormApi } from '@tanstack/vue-form'
import { createFormTargets, scrollToField } from '@fex-design/core/form/field-targets'
import type { FormLayoutOptions, FormScrollToFirstError } from '@fex-design/core/form/types'
import {
  formRootClassName,
  formLayoutClassName,
  formLayoutStyle,
} from '@fex-design/components-styles/form'
import { rootKey } from './context'
defineOptions({ name: 'FormRoot', inheritAttrs: false })
const props = withDefaults(
  defineProps<
    FormLayoutOptions & {
      form: AnyFormApi
      component?: 'form' | false
      scrollToFirstError?: FormScrollToFirstError
    }
  >(),
  {
    component: 'form',
    scrollToFirstError: true,
    layout: 'vertical',
    labelAlign: 'end',
    labelWrap: false,
  },
)
const initialForm = props.form
const targets = createFormTargets()
provide(rootKey, { form: initialForm, targets })
const element = useTemplateRef<HTMLFormElement>('element')
defineExpose({ element })
async function submit(event: SubmitEvent) {
  if (event.defaultPrevented) return
  event.preventDefault()
  if (props.form !== initialForm) throw new Error('Remount FormRoot to replace its form instance.')
  await initialForm.handleSubmit()
  if (!props.scrollToFirstError || initialForm.state.isValid) return
  await nextTick()
  scrollToField(
    targets,
    undefined,
    typeof props.scrollToFirstError === 'boolean' ? {} : props.scrollToFirstError,
  )
}
function reset(event: Event) {
  if (event.defaultPrevented) return
  event.preventDefault()
  initialForm.reset()
}
</script>
<template>
  <slot v-if="component === false" />
  <form
    v-else
    ref="element"
    :novalidate="$attrs.novalidate ?? true"
    v-bind="$attrs"
    :class="[formRootClassName, formLayoutClassName, $attrs.class]"
    :style="[formLayoutStyle(props.labelWidth, props.labelGap), $attrs.style]"
    :data-layout="props.layout"
    :data-label-align="props.labelAlign"
    :data-label-wrap="String(props.labelWrap)"
    data-slot="form-root"
    @submit="submit"
    @reset="reset"
  >
    <slot />
  </form>
</template>
