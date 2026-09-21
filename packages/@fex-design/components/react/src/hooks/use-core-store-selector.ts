import { useMemo, useSyncExternalStore } from 'react'
import type { SnapshotStore } from '@fex-design/core/store/create-store'

/** Subscribe to a selected value while preserving its identity for equal updates. */
export function useCoreStoreSelector<T, S>(
  store: SnapshotStore<T>,
  selector: (snapshot: T) => S,
  isEqual: (left: S, right: S) => boolean = Object.is,
): S {
  // Each subscription owns its cache; changing the store or selector replaces it.
  const getSelection = useMemo(() => {
    let initialized = false
    let snapshot: T
    let selection: S
    return () => {
      const nextSnapshot = store.getSnapshot()
      if (initialized && Object.is(snapshot, nextSnapshot)) return selection
      const nextSelection = selector(nextSnapshot)
      if (!initialized || !isEqual(selection, nextSelection)) selection = nextSelection
      initialized = true
      snapshot = nextSnapshot
      return selection
    }
  }, [store, selector, isEqual])
  return useSyncExternalStore(store.subscribe, getSelection, getSelection)
}
