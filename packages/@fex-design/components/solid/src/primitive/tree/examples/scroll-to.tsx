import { createSignal } from 'solid-js'
import {
  TreeRoot,
  TreeViewport,
  TreeItem,
  TreeTrigger,
  TreeTitle,
  expansionFeature,
  focusFeature,
  type TreeDataNode,
  type TreeViewportHandle,
} from '@fex-design/solid/primitive/tree'
import { Button } from '@fex-design/solid/primitive/button'
import { treeDemoData } from './_data/tree-demo'
const options = {
  treeData: treeDemoData,
  features: [
    expansionFeature<TreeDataNode<string, string>>(),
    focusFeature<TreeDataNode<string, string>>(),
  ],
}
export default function ScrollToExample() {
  let viewport: TreeViewportHandle | undefined
  const [message, setMessage] = createSignal('')
  function locate() {
    const found = viewport?.scrollTo('root-2-group-3-item-3', { reveal: true })
    setMessage(found ? '已定位 Item 2.3.3' : '未能定位目标节点')
  }
  return (
    <div class="grid w-full gap-space-sm">
      <Button class="w-full" onClick={locate}>
        Scroll to Item 2.3.3
      </Button>
      <TreeRoot options={options}>
        <TreeViewport ref={(handle) => (viewport = handle)} class="h-48 overflow-y-auto">
          {(item) => (
            <TreeItem itemKey={item.key}>
              {(state) => (
                <div {...state.itemProps}>
                  <TreeTrigger itemKey={item.key} />
                  <TreeTitle>{String(item.title)}</TreeTitle>
                </div>
              )}
            </TreeItem>
          )}
        </TreeViewport>
      </TreeRoot>
      <output class="min-h-5 text-xs text-muted-foreground" aria-live="polite">
        {message()}
      </output>
    </div>
  )
}
