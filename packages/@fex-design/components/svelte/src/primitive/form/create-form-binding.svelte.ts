import { useSelector } from '@tanstack/svelte-form'
import { getFormFieldPresentation } from '@fex-design/core/form/field-presentation'
import { readableCoreStore } from '../../stores/core-store'
import { getFieldScope, getRoot } from './context'
export function createFormBinding() {
  const scope = getFieldScope()
  const attempts = useSelector(getRoot().form.store, (state) => state.submissionAttempts)
  return {
    ...scope,
    links: readableCoreStore(scope.association),
    presentation: () => getFormFieldPresentation(scope.field.state, attempts.current, 'touched'),
  }
}
