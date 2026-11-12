/** Bridge the official TanStack subscription object to the existing snapshot adapters. */
export function formSnapshotStore<T>(store: {
  readonly state: T
  subscribe: (listener: () => void) => { unsubscribe: () => void }
}) {
  return {
    getSnapshot: () => store.state,
    subscribe(listener: () => void) {
      const subscription = store.subscribe(listener)
      return () => subscription.unsubscribe()
    },
  }
}
