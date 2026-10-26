import { createSignal } from 'solid-js'
import { Tree, type TreeInstance } from '@fex-design/solid/ui/tree'
import { Button } from '@fex-design/solid/ui/button'
import { treeDemoData } from './_data/tree-demo'
export default function Example() {
  let tree: TreeInstance<Record<string, unknown>> | undefined
  const [message, setMessage] = createSignal('')
  function locate() {
    const found = tree?.scrollTo('root-2-group-3-item-3', { reveal: true })
    setMessage(found ? '已定位 Item 2.3.3' : '未能定位目标节点')
  }
  return (
    <div class="grid w-full gap-space-sm">
      <Button class="w-full" onClick={locate}>
        Scroll to Item 2.3.3
      </Button>
      <Tree
        ref={(instance) => (tree = instance)}
        treeData={treeDemoData}
        classNames={{ viewport: 'h-48 overflow-y-auto' }}
      />
      <output class="min-h-5 text-xs text-muted-foreground" aria-live="polite">
        {message()}
      </output>
    </div>
  )
}
