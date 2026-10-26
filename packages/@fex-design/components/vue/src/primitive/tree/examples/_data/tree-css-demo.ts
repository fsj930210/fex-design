import { treeDemoData } from './tree-demo'
import { getTreeDemoChildren } from './tree-records'

// This scene only needs one department, one group, and two items.
export const treeCssDemoData: readonly Record<string, unknown>[] = treeDemoData
  .slice(0, 1)
  .map((node) => ({
    ...node,
    children: getTreeDemoChildren(node)
      .slice(0, 1)
      .map((group) => ({
        ...group,
        children: getTreeDemoChildren(group).slice(0, 2),
      })),
  }))
