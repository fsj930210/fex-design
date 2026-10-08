import type { AsyncLoadFeatureApi } from '@fex-design/core/tree/features/async-load'
import type { ExpansionFeatureApi } from '@fex-design/core/tree/features/expansion'
import type { TreeKey, TreeNodeData } from '@fex-design/core/tree/types'
import { treeTriggerClassName } from '@fex-design/components-styles/tree'
import { cn } from '@fex-design/utils'
import type { ButtonHTMLAttributes } from 'react'
import { ChevronDownIcon } from '@fex-design/react/icons/chevron'
import { useTreeContext } from './tree-context'
import { useTreeItem } from './use-tree-item'

export interface TreeTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  itemKey: TreeKey
}

export function TreeTrigger({ itemKey, className, onClick, children, ...props }: TreeTriggerProps) {
  const { tree } = useTreeContext<TreeNodeData>()
  const state = useTreeItem(tree, itemKey)
  const expansion = tree.getFeature<ExpansionFeatureApi>('expansion')
  if (!state.item || state.item.isLeaf || !expansion) {
    return (
      <span aria-hidden="true" data-slot="tree-trigger-placeholder" className="size-5 shrink-0" />
    )
  }
  return (
    <button
      {...props}
      type="button"
      data-slot="tree-trigger"
      aria-expanded={state.expanded}
      className={cn(treeTriggerClassName, className)}
      onClick={(event) => {
        event.stopPropagation()
        onClick?.(event)
        if (!event.defaultPrevented) {
          if (state.expanded) {
            expansion.collapse(itemKey)
            return
          }
          const loading = tree.getFeature<AsyncLoadFeatureApi>('async-load')?.load(itemKey)
          if (!loading) {
            expansion.expand(itemKey)
            return
          }
          void loading.then((result) => {
            if ((result as { ok?: boolean } | undefined)?.ok) expansion.expand(itemKey)
          })
        }
      }}
    >
      {children ?? <ChevronDownIcon className="size-4" />}
    </button>
  )
}
