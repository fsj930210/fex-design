export { default as FormRoot } from './form-root.svelte'
export { getFormActions } from './form-actions'
export { default as FormField } from './form-field.svelte'
export { default as FormControl } from './form-control.svelte'
export { default as FormLabel } from './form-label.svelte'
export { default as FormDescription } from './form-description.svelte'
export { default as FormError } from './form-error.svelte'
export { default as FormGroup } from './form-group.svelte'
export { default as FormLegend } from './form-legend.svelte'
export { default as FormSubscribe } from './form-subscribe.svelte'
export type {
  AnyFormApi,
  AnyFormState,
  FormOptions,
  DeepKeys,
  DeepValue,
} from '@tanstack/svelte-form'
export type { FormFieldOptions, FormFieldApi } from './form-types'
export type {
  FormLayout,
  FormLayoutOptions,
  FormScrollToFirstError,
  FormScrollOptions,
} from '@fex-design/core/form/types'
export { scrollToField, focusField } from '@fex-design/core/form/field-targets'
export type { FormTargets } from '@fex-design/core/form/field-targets'
