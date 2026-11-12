<script
  setup
  lang="ts"
  generic="TData = Record<string, unknown>, TName extends DeepKeys<TData> = DeepKeys<TData>"
>
import { useId } from 'vue'
import type { DeepKeys } from '@tanstack/vue-form'
import type { FormFieldOptions } from './form-types'
import { createFormFieldAssociation } from '@fex-design/core/form/field-association'
import { formFieldClassName } from '@fex-design/components-styles/form'
import FieldContext from './form-field-context.vue'
import { useRootContext } from './context'

defineOptions({ name: 'FormField', inheritAttrs: false })
const props = defineProps<
  FormFieldOptions<TData, TName> & { class?: string; style?: string | Record<string, unknown> }
>()
const root = useRootContext()
const association = createFormFieldAssociation(`control-${useId()}`)
</script>
<template>
  <!-- TanStack Field captures its options in setup; a new path needs a new field lifecycle. -->
  <root.form.Field :key="props.name" v-bind="props" v-slot="{ field }">
    <FieldContext :field="field" :association="association"
      ><div data-slot="form-field" :class="[formFieldClassName, props.class]" :style="props.style">
        <slot :field="field" :state="field.state" /></div
    ></FieldContext>
  </root.form.Field>
</template>
