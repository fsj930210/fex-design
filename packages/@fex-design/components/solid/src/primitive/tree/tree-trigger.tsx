import type { AsyncLoadFeatureApi } from '@fex-design/core/tree/features/async-load'
import type { ExpansionFeatureApi } from '@fex-design/core/tree/features/expansion'
import type { TreeKey, TreeNodeData } from '@fex-design/core/tree/types'
import { treeTriggerClassName } from '@fex-design/components-styles/tree'
import { cn } from '@fex-design/utils'
import { Show, splitProps, type JSX } from 'solid-js'
import { createTreeItem } from './create-tree-item'
import { useTreeContext } from './tree-context'

export interface TreeTriggerProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  itemKey: TreeKey
}

export function TreeTrigger(props: TreeTriggerProps) {
  const [local, attrs] = splitProps(props, ['itemKey', 'class', 'children', 'onClick'])
  const { tree } = useTreeContext<TreeNodeData>('TreeTrigger')
  const state = createTreeItem(tree, local.itemKey)
  const expansion = () => tree.getFeature<ExpansionFeatureApi>('expansion')
  const click: JSX.EventHandler<HTMLButtonElement, MouseEvent> = (event) => {
    event.stopPropagation()
    if (typeof local.onClick === 'function') local.onClick(event)
    if (event.defaultPrevented) return
    if (state().expanded) {
      expansion()?.collapse(local.itemKey)
      return
    }
    const loading = tree.getFeature<AsyncLoadFeatureApi>('async-load')?.load(local.itemKey)
    if (!loading) {
      expansion()?.expand(local.itemKey)
      return
    }
    void loading.then((result) => {
      if ((result as { ok?: boolean } | undefined)?.ok) expansion()?.expand(local.itemKey)
    })
  }

  return (
    <Show
      when={state().item && !state().item?.isLeaf && expansion()}
      fallback={
        <span aria-hidden="true" data-slot="tree-trigger-placeholder" class="size-5 shrink-0" />
      }
    >
      <button
        {...attrs}
        type="button"
        data-slot="tree-trigger"
        aria-expanded={state().expanded}
        class={cn(treeTriggerClassName, local.class)}
        onClick={click}
      >
        {local.children ?? (
          <svg
            aria-hidden="true"
            class="size-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        )}
      </button>
    </Show>
  )
}
