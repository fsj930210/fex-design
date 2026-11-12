<script setup lang="ts">
import type { FormLayoutOptions, FormScrollToFirstError } from '@fex-design/core/form/types'
import { FormRoot } from '@fex-design/vue/primitive/form'
import { computed, useAttrs } from 'vue'
import type { AnyFormApi } from '@tanstack/vue-form'
import type { FormClassNames, FormStyles } from './form.types'
defineOptions({ name: 'Form', inheritAttrs: false })
const props = withDefaults(
  defineProps<
    FormLayoutOptions & {
      form: AnyFormApi
      component?: 'form' | false
      scrollToFirstError?: FormScrollToFirstError
      class?: string
      style?: string | Record<string, unknown>
      classNames?: FormClassNames
      styles?: FormStyles
    }
  >(),
  { component: 'form', scrollToFirstError: true },
)
const attrs = useAttrs()
const rootProps = computed(() => {
  const { class: _class, style: _style, classNames: _classNames, styles: _styles, ...rest } = props
  return rest
})
const mergedRootProps = computed(() => ({ ...attrs, ...rootProps.value }))
</script>
<template>
  <FormRoot
    v-bind="mergedRootProps"
    :class="[props.classNames?.root, props.class]"
    :style="[props.styles?.root, props.style]"
    ><slot
  /></FormRoot>
</template>
