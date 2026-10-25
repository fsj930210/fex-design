import type { TreeDataNode } from '@fex-design/react/ui/tree'

export const virtualTreeDemoData: readonly TreeDataNode<string, string>[] = Array.from(
  { length: 100 },
  (_, root) => ({
    key: 'virtual-root-' + (root + 1),
    title: 'Department ' + (root + 1),
    children: Array.from({ length: 5 }, (_, group) => ({
      key: 'virtual-root-' + (root + 1) + '-group-' + (group + 1),
      title: 'Group ' + (root + 1) + '.' + (group + 1),
      children: Array.from({ length: 10 }, (_, item) => ({
        key: 'virtual-root-' + (root + 1) + '-group-' + (group + 1) + '-item-' + (item + 1),
        title: 'Item ' + (root + 1) + '.' + (group + 1) + '.' + (item + 1),
      })),
    })),
  }),
)
export const virtualTreeExpandedKeys = virtualTreeDemoData.flatMap((root) => [
  root.key,
  ...(root.children ?? []).map((group) => group.key),
])
export const virtualTreeTargetKey = 'virtual-root-80-group-4-item-8'
export const virtualTreeNodeCount = 5600
