import { useRef, useState } from 'react'
import {
  TreeRoot,
  TreeViewport,
  TreeItem,
  TreeTrigger,
  TreeTitle,
  expansionFeature,
  focusFeature,
  type TreeViewportHandle,
} from '@fex-design/react/primitive/tree'
import { Button } from '@fex-design/react/primitive/button'
import { treeDemoData } from './_data/tree-demo'
const options = {
  treeData: treeDemoData,
  features: [expansionFeature<Record<string, unknown>>(), focusFeature<Record<string, unknown>>()],
}
export default function ScrollToExample() {
  const viewport = useRef<TreeViewportHandle>(null)
  const [message, setMessage] = useState('')
  function locate() {
    const found = viewport.current?.scrollTo('root-2-group-3-item-3', { reveal: true })
    setMessage(found ? '已定位 Item 2.3.3' : '未能定位目标节点')
  }
  return (
    <div className="grid w-full gap-space-sm">
      <Button className="w-full" onClick={locate}>
        Scroll to Item 2.3.3
      </Button>
      <TreeRoot options={options}>
        <TreeViewport ref={viewport} className="h-48 overflow-y-auto">
          {(item) => (
            <TreeItem key={item.key} itemKey={item.key}>
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
      <output className="min-h-5 text-xs text-muted-foreground" aria-live="polite">
        {message}
      </output>
    </div>
  )
}
