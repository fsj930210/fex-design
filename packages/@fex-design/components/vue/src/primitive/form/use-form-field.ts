import { computed } from 'vue'
import { useSelector } from '@tanstack/vue-form'
import { getFormFieldPresentation } from '@fex-design/core/form/field-presentation'
import { useCoreStore } from '../../composables/use-core-store'
import { useFieldContext, useRootContext } from './context'
export function useFieldPresentation() {
  const scope = useFieldContext()
  const state = useSelector(scope.field.store, (snapshot) => snapshot)
  const attempts = useSelector(
    useRootContext().form.store,
    (snapshot) => snapshot.submissionAttempts,
  )
  return {
    ...scope,
    links: useCoreStore(scope.association),
    presentation: computed(() => getFormFieldPresentation(state.value, attempts.value, 'touched')),
  }
}
