import type { Store } from '../store/create-store'
import type { TreeKey, TreeNodeData, TreeSnapshot } from './types'

/** Publishes interaction state and caller-supplied data projections, never edits treeData. */
export function createTreePublisher<T extends TreeNodeData>(store: Store<TreeSnapshot<T>>) {
  const nodeListeners = new Map<TreeKey, Set<() => void>>()
  const visibleListeners = new Set<() => void>()
  return {
    setSnapshot(next: TreeSnapshot<T>, changed: readonly TreeKey[], visibleChanged: boolean) {
      store.setSnapshot(next)
      for (const key of changed) for (const listener of nodeListeners.get(key) ?? []) listener()
      if (visibleChanged) for (const listener of visibleListeners) listener()
    },
    subscribeNode(key: TreeKey, listener: () => void) {
      const listeners = nodeListeners.get(key) ?? new Set<() => void>()
      listeners.add(listener)
      nodeListeners.set(key, listeners)
      return () => {
        listeners.delete(listener)
        if (listeners.size === 0) nodeListeners.delete(key)
      }
    },
    subscribeVisible(listener: () => void) {
      visibleListeners.add(listener)
      return () => {
        visibleListeners.delete(listener)
      }
    },
  }
}
