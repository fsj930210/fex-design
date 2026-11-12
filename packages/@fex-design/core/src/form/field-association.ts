import { createStore } from '../store/create-store'
import type { FormAssociation } from './types'

/** Only DOM associations live here; values and validation always remain in TanStack. */
export function createFormFieldAssociation(controlId: string) {
  const store = createStore<FormAssociation>({
    controlId,
    labels: [],
    descriptions: [],
    errors: [],
    required: false,
  })
  const requiredLabels = new Set<symbol>()
  return {
    ...store,
    setControlId(id: string) {
      store.updateSnapshot((state) =>
        state.controlId === id ? state : { ...state, controlId: id },
      )
    },
    register(kind: 'labels' | 'descriptions' | 'errors', id: string) {
      store.updateSnapshot((state) => ({ ...state, [kind]: [...state[kind], id] }))
      return () =>
        store.updateSnapshot((state) => ({
          ...state,
          [kind]: state[kind].filter((value) => value !== id),
        }))
    },
    require() {
      const token = Symbol()
      requiredLabels.add(token)
      store.updateSnapshot((state) => ({ ...state, required: true }))
      return () => {
        requiredLabels.delete(token)
        store.updateSnapshot((state) => ({ ...state, required: requiredLabels.size > 0 }))
      }
    },
  }
}
