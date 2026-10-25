import { createTreeMutations } from './create-tree-mutations'
import {
  buildTreeIndex,
  buildVisibleTreeItems,
  refreshTreeCapabilities,
  getTreeAncestors,
  getTreeDescendants,
  type TreeIndex,
} from './tree-index'
import { uniqueKeys, sameKeys } from './tree-utils'
import { resolveTreeFieldNames, treeNodeOptionsChanged } from './resolve-tree-node'
import { createStore } from '../store/create-store'
import { createTreeFeatureRuntime } from './create-feature-runtime'
import type { TreeFeatureRuntime } from './create-feature-runtime'
import type { TreeController, TreeKey, TreeNodeData, TreeOptions, TreeSnapshot } from './types'

/**
 * Owns the normalized tree index, snapshots, subscriptions, visible projection,
 * and framework-independent immutable tree-data mutations.
 * Optional behavior is installed by feature modules so unused algorithms remain tree-shakeable.
 */
export function createTreeController<TNode extends TreeNodeData>(
  initialOptions: TreeOptions<TNode>,
): TreeController<TNode> {
  let options = initialOptions
  let featureRuntime: TreeFeatureRuntime<TNode> | undefined
  let index: TreeIndex<TNode> = {
    items: new Map(),
    childrenByKey: new Map(),
    parentByKey: new Map(),
  }
  const nodeListeners = new Map<TreeKey, Set<() => void>>()
  const visibleListeners = new Set<() => void>()

  const getFieldNames = () => resolveTreeFieldNames(options)

  function getKey(node: TNode): TreeKey {
    const field = getFieldNames().key
    const key = node[field]
    if (typeof key !== 'string' && typeof key !== 'number') {
      throw new Error(`Tree node field "${field}" must be a string or number.`)
    }
    return key
  }

  function getChildren(node: TNode): readonly TNode[] {
    const value = node[getFieldNames().children]
    return Array.isArray(value) ? (value as readonly TNode[]) : []
  }

  function buildSnapshot(
    treeData: readonly TNode[],
    expandedKeys: readonly TreeKey[],
    selectedKeys: readonly TreeKey[],
    checkedKeys: readonly TreeKey[],
    focusedKey: TreeKey | null,
  ): TreeSnapshot<TNode> {
    index = buildTreeIndex(treeData, options, getKey, getChildren)
    const validKeys = new Set(index.items.keys())
    const nextExpandedKeys = uniqueKeys(expandedKeys.filter((key) => validKeys.has(key)))
    return {
      treeData,
      expandedKeys: nextExpandedKeys,
      selectedKeys: uniqueKeys(selectedKeys.filter((key) => validKeys.has(key))),
      checkedKeys: uniqueKeys(checkedKeys.filter((key) => validKeys.has(key))),
      focusedKey: focusedKey !== null && validKeys.has(focusedKey) ? focusedKey : null,
      items: index.items,
      visibleItems: buildVisibleTreeItems(index, nextExpandedKeys),
    }
  }

  const initialSnapshot = buildSnapshot(
    initialOptions.treeData,
    initialOptions.expandedKeys ?? initialOptions.defaultExpandedKeys ?? [],
    initialOptions.selectedKeys ?? initialOptions.defaultSelectedKeys ?? [],
    initialOptions.checkedKeys ?? initialOptions.defaultCheckedKeys ?? [],
    initialOptions.focusedKey !== undefined
      ? initialOptions.focusedKey
      : (initialOptions.defaultFocusedKey ?? null),
  )
  const store = createStore(initialSnapshot)

  function getSnapshot() {
    return store.getSnapshot()
  }

  function notifyNodes(keys: readonly TreeKey[], visibleChanged = false) {
    for (const key of keys) {
      for (const listener of nodeListeners.get(key) ?? []) listener()
    }
    if (visibleChanged) {
      for (const listener of visibleListeners) listener()
    }
  }

  function setSnapshot(
    next: TreeSnapshot<TNode>,
    changedKeys: readonly TreeKey[],
    visibleChanged: boolean,
  ) {
    store.setSnapshot(next)
    notifyNodes(changedKeys, visibleChanged)
  }

  function commitState(
    patch: Partial<
      Pick<
        TreeSnapshot<TNode>,
        'expandedKeys' | 'selectedKeys' | 'checkedKeys' | 'focusedKey' | 'items'
      >
    >,
    changedKeys: readonly TreeKey[],
    visibleChanged = false,
  ) {
    const current = getSnapshot()
    setSnapshot(
      {
        ...current,
        ...patch,
        visibleItems: visibleChanged
          ? buildVisibleTreeItems(index, patch.expandedKeys ?? current.expandedKeys)
          : current.visibleItems,
      },
      changedKeys,
      visibleChanged,
    )
  }

  function updateStateKeys(
    field: 'expandedKeys' | 'selectedKeys' | 'checkedKeys',
    keys: readonly TreeKey[],
    changedKeys: readonly TreeKey[],
  ) {
    if (options.disabled) return
    const current = getSnapshot()
    const previous = current[field]
    const nextKeys = uniqueKeys(keys)
    if (sameKeys(previous, nextKeys)) return
    const visibleChanged = field === 'expandedKeys'
    if (options[field] === undefined) {
      commitState(
        { [field]: nextKeys },
        uniqueKeys([...changedKeys, ...previous, ...nextKeys]),
        visibleChanged,
      )
    }
    if (field === 'expandedKeys') options.onExpandedKeysChange?.(nextKeys, { changedKeys })
    if (field === 'selectedKeys') options.onSelectedKeysChange?.(nextKeys, { changedKeys })
    if (field === 'checkedKeys') options.onCheckedKeysChange?.(nextKeys, { changedKeys })
  }

  function initializeStateKeys(
    field: 'expandedKeys' | 'selectedKeys' | 'checkedKeys',
    keys: readonly TreeKey[],
  ) {
    if (options[field] !== undefined) return
    const current = getSnapshot()
    const previous = current[field]
    const nextKeys = uniqueKeys(keys)
    if (sameKeys(previous, nextKeys)) return
    commitState(
      { [field]: nextKeys },
      uniqueKeys([...previous, ...nextKeys]),
      field === 'expandedKeys',
    )
  }

  function setFocusedKey(key: TreeKey | null) {
    if (options.disabled) return
    if (key !== null && !index.items.has(key)) return
    const previous = getSnapshot().focusedKey
    if (previous === key) return
    if (options.focusedKey === undefined) {
      commitState(
        { focusedKey: key },
        uniqueKeys([...(previous === null ? [] : [previous]), ...(key === null ? [] : [key])]),
      )
    }
    options.onFocusedKeyChange?.(key)
  }

  const getDescendantKeys = (key: TreeKey) => getTreeDescendants(index, key)
  const getAncestorKeys = (key: TreeKey) => getTreeAncestors(index, key)

  const { updateNode, insertNode, removeNode, moveNode, replaceChildren } = createTreeMutations({
    getOptions: () => options,
    getIndex: () => index,
    setIndex: (next) => {
      index = next
    },
    getSnapshot,
    setSnapshot,
    buildSnapshot,
    getFieldNames,
    getKey,
    getChildren,
    getAncestorKeys,
    getDescendantKeys,
  })
  const controller: TreeController<TNode> = {
    getSnapshot,
    subscribe: store.subscribe,
    subscribeNode(key, listener) {
      const listeners = nodeListeners.get(key) ?? new Set<() => void>()
      listeners.add(listener)
      nodeListeners.set(key, listeners)
      return () => listeners.delete(listener)
    },
    subscribeVisible(listener) {
      visibleListeners.add(listener)
      return () => visibleListeners.delete(listener)
    },
    subscribeSelector: store.subscribeSelector,
    hasFeature: (id) => featureRuntime?.has(id) ?? false,
    getFeature: (id) => featureRuntime?.get(id),
    updateNode,
    insertNode,
    removeNode,
    moveNode,
    replaceChildren,
    updateOptions(nextOptions) {
      const previousOptions = options
      options = {
        ...options,
        ...nextOptions,
      }
      const current = getSnapshot()
      const structureChanged =
        (Object.hasOwn(nextOptions, 'treeData') &&
          nextOptions.treeData !== previousOptions.treeData) ||
        (Object.hasOwn(nextOptions, 'fieldNames') &&
          nextOptions.fieldNames !== previousOptions.fieldNames)

      if (structureChanged) {
        const next = buildSnapshot(
          nextOptions.treeData ?? current.treeData,
          nextOptions.expandedKeys ?? current.expandedKeys,
          nextOptions.selectedKeys ?? current.selectedKeys,
          nextOptions.checkedKeys ?? current.checkedKeys,
          nextOptions.focusedKey !== undefined ? nextOptions.focusedKey : current.focusedKey,
        )
        setSnapshot(next, uniqueKeys([...current.items.keys(), ...next.items.keys()]), true)
        return
      }

      const nodeOptionsChanged = treeNodeOptionsChanged(previousOptions, nextOptions)
      if (nodeOptionsChanged) index = refreshTreeCapabilities(index, options)
      const nextExpandedKeys = nextOptions.expandedKeys ?? current.expandedKeys
      const nextSelectedKeys = nextOptions.selectedKeys ?? current.selectedKeys
      const nextCheckedKeys = nextOptions.checkedKeys ?? current.checkedKeys
      const nextFocusedKey =
        nextOptions.focusedKey !== undefined ? nextOptions.focusedKey : current.focusedKey
      const expandedChanged = !sameKeys(current.expandedKeys, nextExpandedKeys)
      const selectedChanged = !sameKeys(current.selectedKeys, nextSelectedKeys)
      const checkedChanged = !sameKeys(current.checkedKeys, nextCheckedKeys)
      const focusedChanged = current.focusedKey !== nextFocusedKey
      const checkModeChanged =
        (previousOptions.checkMode ?? 'cascade') !== (options.checkMode ?? 'cascade')
      if (
        !expandedChanged &&
        !selectedChanged &&
        !checkedChanged &&
        !focusedChanged &&
        !checkModeChanged &&
        !nodeOptionsChanged
      )
        return
      commitState(
        {
          items: index.items,
          expandedKeys: uniqueKeys(nextExpandedKeys),
          selectedKeys: uniqueKeys(nextSelectedKeys),
          checkedKeys: uniqueKeys(nextCheckedKeys),
          focusedKey: nextFocusedKey,
        },
        uniqueKeys([
          ...(checkModeChanged || nodeOptionsChanged ? current.items.keys() : []),
          ...(expandedChanged ? [...current.expandedKeys, ...nextExpandedKeys] : []),
          ...(selectedChanged ? [...current.selectedKeys, ...nextSelectedKeys] : []),
          ...(checkedChanged ? [...current.checkedKeys, ...nextCheckedKeys] : []),
          ...(focusedChanged
            ? [
                ...(current.focusedKey === null ? [] : [current.focusedKey]),
                ...(nextFocusedKey === null ? [] : [nextFocusedKey]),
              ]
            : []),
        ]),
        expandedChanged || nodeOptionsChanged,
      )
    },
    getItem: (key) => index.items.get(key),
    // oxlint-disable-next-line unicorn/no-array-reverse -- getAncestorKeys returns a fresh array and the workspace targets ES2022.
    getPath: (key) => [...getAncestorKeys(key).reverse(), key],
    getVisibleItems: () => getSnapshot().visibleItems,
    getVisibleCount: () => getSnapshot().visibleItems.length,
    getVisibleItemAt: (itemIndex) => getSnapshot().visibleItems[itemIndex],
    getVisibleIndex(key) {
      const visibleIndex = getSnapshot().visibleItems.findIndex((item) => item.key === key)
      return visibleIndex < 0 ? undefined : visibleIndex
    },
  }

  featureRuntime = createTreeFeatureRuntime({
    getSnapshot,
    getItem: (key) => index.items.get(key),
    // oxlint-disable-next-line unicorn/no-array-reverse -- getAncestorKeys returns a fresh array and the workspace targets ES2022.
    getPath: (key) => [...getAncestorKeys(key).reverse(), key],
    updateFeatureState: (changedKeys = []) => commitState({}, changedKeys),
    configure: (featureOptions) => {
      options = { ...options, ...featureOptions }
    },
    getOptions: () => options,
    getItems: () => index.items,
    getVisibleItems: () => getSnapshot().visibleItems,
    getChildrenKeys: (key) => index.childrenByKey.get(key) ?? [],
    getAncestorKeys,
    getDescendantKeys,
    setStateKeys: updateStateKeys,
    initializeStateKeys,
    setFocusedKey,
    getFeature: (id) => featureRuntime?.get(id),
    getFieldNames,
    getKey,
    getChildren,
    updateNode,
    insertNode,
    removeNode,
    moveNode,
    replaceChildren,
  })
  featureRuntime.installAll(initialOptions.features ?? [])

  return controller
}
