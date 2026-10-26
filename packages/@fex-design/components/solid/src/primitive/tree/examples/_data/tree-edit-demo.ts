import { getTreeDemoChildren } from './tree-records'
type Data = Record<string, unknown>
type Key = string | number
export interface DemoMove {
  sourceKey: Key
  parentKey: Key | null
  index: number
}

/** Demo-only backend: mutations change server data; fetchTree is the only client read. */
export function createTreeDemoService(initial: readonly Data[]) {
  let data = initial
  let sequence = 0
  const wait = () => new Promise<void>((resolve) => setTimeout(resolve, 250))
  function change(nodes: readonly Data[], key: Key, edit: (node: Data) => Data): readonly Data[] {
    return nodes.map((node) =>
      node.key === key
        ? edit(node)
        : {
            ...node,
            ...(getTreeDemoChildren(node).length
              ? { children: change(getTreeDemoChildren(node), key, edit) }
              : {}),
          },
    )
  }
  function without(nodes: readonly Data[], key: Key): readonly Data[] {
    return nodes
      .filter((node) => node.key !== key)
      .map((node) => {
        const children = getTreeDemoChildren(node)
        if (!children.length) return node
        const next = without(children, key)
        return { ...node, children: next, isLeaf: next.length === 0 }
      })
  }
  function find(nodes: readonly Data[], key: Key): Data | undefined {
    for (const node of nodes) {
      if (node.key === key) return node
      const result = find(getTreeDemoChildren(node), key)
      if (result) return result
    }
  }
  return {
    async fetchTree(): Promise<readonly Data[]> {
      await wait()
      return data
    },
    async create(parentKey: Key | null): Promise<void> {
      await wait()
      const node = { key: 'server-node-' + ++sequence, title: '新增节点 ' + sequence }
      data =
        parentKey === null
          ? [...data, node]
          : change(data, parentKey, (parent) => ({
              ...parent,
              isLeaf: false,
              children: [...getTreeDemoChildren(parent), node],
            }))
    },
    async rename(key: Key, title: string): Promise<void> {
      await wait()
      data = change(data, key, (node) => ({ ...node, title }))
    },
    async remove(key: Key): Promise<void> {
      await wait()
      data = without(data, key)
    },
    async move(input: DemoMove): Promise<void> {
      await wait()
      const source = find(data, input.sourceKey)
      if (!source) throw new Error('节点不存在')
      const remaining = without(data, input.sourceKey)
      const insert = (children: readonly Data[]) => {
        const next = [...children]
        next.splice(Math.max(0, Math.min(input.index, next.length)), 0, source)
        return next
      }
      data =
        input.parentKey === null
          ? insert(remaining)
          : change(remaining, input.parentKey, (parent) => ({
              ...parent,
              isLeaf: false,
              children: insert(getTreeDemoChildren(parent)),
            }))
    },
  }
}
