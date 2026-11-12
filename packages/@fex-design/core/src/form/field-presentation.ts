import type { FormErrorVisibility, FormFieldSnapshot } from './types'

export function getFormFieldPresentation(
  field: FormFieldSnapshot,
  submissionAttempts: number,
  visibility: FormErrorVisibility = 'touched',
) {
  const visible =
    visibility === 'always' ||
    submissionAttempts > 0 ||
    (visibility === 'touched' && field.meta.isTouched)
  const presentation = {
    invalid: visible && field.meta.errors.length > 0,
    errors: visible ? field.meta.errors : [],
    isValidating: field.meta.isValidating,
  }
  return presentation
}
