import { createMemo } from 'solid-js'
import { useSelector } from '@tanstack/solid-form'
import { getFormFieldPresentation } from '@fex-design/core/form/field-presentation'
import { createCoreStoreSignal } from '../../primitives/create-core-store-signal'
import { useFieldContext, useRootContext } from './context'

export function createFormBinding() {
  const scope = useFieldContext()
  const root = useRootContext()
  const links = createCoreStoreSignal(scope.association)
  const fieldValue = useSelector(scope.field().store, (snapshot) => snapshot.value)
  const fieldMeta = useSelector(scope.field().store, (snapshot) => snapshot.meta)
  const attempts = useSelector(root.form.store, (state) => state.submissionAttempts)
  const presentation = createMemo(() => {
    const snapshot = { value: fieldValue(), meta: fieldMeta() }
    const errorMap = (
      snapshot.meta as typeof snapshot.meta & { errorMap?: Record<string, unknown> }
    ).errorMap
    const errors = [
      ...Object.values(errorMap ?? {}).flatMap((error) => (Array.isArray(error) ? error : [error])),
      ...snapshot.meta.errors,
    ].filter((error) => error !== undefined && error !== null)
    return getFormFieldPresentation(
      errors.length > 0 ? { ...snapshot, meta: { ...snapshot.meta, errors } } : snapshot,
      attempts(),
      'touched',
    )
  })
  return { ...scope, links, presentation }
}
