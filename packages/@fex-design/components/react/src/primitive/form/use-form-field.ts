import { useSelector } from '@tanstack/react-form'
import { getFormFieldPresentation } from '@fex-design/core/form/field-presentation'
import { useCoreStore } from '../../hooks/use-core-store'
import { useFieldContext, useRootContext } from './context'

export function useFieldPresentation() {
  const { field, association } = useFieldContext()
  const root = useRootContext()
  const state = useSelector(field.store, (snapshot) => snapshot)
  const attempts = useSelector(root.form.store, (snapshot) => snapshot.submissionAttempts)
  return {
    field,
    association,
    links: useCoreStore(association),
    ...getFormFieldPresentation(state, attempts, 'touched'),
  }
}
