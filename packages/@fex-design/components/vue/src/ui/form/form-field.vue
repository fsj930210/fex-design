<script
  setup
  lang="ts"
  generic="TData = Record<string, unknown>, TName extends DeepKeys<TData> = DeepKeys<TData>"
>
import {
  FormField as PrimitiveFormField,
  FormControl,
  FormLabel,
  FormDescription,
  FormError,
} from '@fex-design/vue/primitive/form'
import type { DeepKeys } from '@tanstack/vue-form'
import type { FormFieldOptions } from '@fex-design/vue/primitive/form'
import { computed, useSlots, type VNodeChild } from 'vue'
import type { FormClassNames, FormStyles } from './form.types'
defineOptions({ name: 'FormField', inheritAttrs: false })
const props = withDefaults(
  defineProps<
    FormFieldOptions<TData, TName> & {
      label?: VNodeChild
      description?: VNodeChild
      error?: VNodeChild | ((errors: readonly unknown[]) => VNodeChild)
      required?: boolean
      showError?: boolean
      class?: string
      style?: string | Record<string, string>
      classNames?: Pick<FormClassNames, 'field' | 'label' | 'description' | 'error'>
      styles?: Pick<FormStyles, 'field' | 'label' | 'description' | 'error'>
    }
  >(),
  {
    showError: true,
  },
)
const slots = useSlots()
const fieldProps = computed(() => {
  const {
    label,
    description,
    error,
    required,
    showError,
    class: className,
    style,
    classNames,
    styles,
    ...field
  } = props
  return field
})
</script>
<template>
  <PrimitiveFormField
    v-bind="fieldProps"
    :class="[classNames?.field, props.class]"
    :style="[styles?.field, style]"
    v-slot="scope"
  >
    <FormLabel
      v-if="(props.label !== undefined && props.label !== false) || slots.label"
      :required="props.required"
      :class="classNames?.label"
      :style="styles?.label"
      ><slot name="label"
        ><template v-if="props.label !== false">{{ props.label }}</template></slot
      ></FormLabel
    >
    <FormControl>
      <slot :field="scope.field" :state="scope.state" />
    </FormControl>
    <FormDescription
      v-if="(props.description !== undefined && props.description !== false) || slots.description"
      :class="classNames?.description"
      :style="styles?.description"
      ><slot name="description"
        ><template v-if="props.description !== false">{{ props.description }}</template></slot
      ></FormDescription
    >
    <FormError v-if="props.showError !== false" :class="classNames?.error" :style="styles?.error" />
  </PrimitiveFormField>
</template>
