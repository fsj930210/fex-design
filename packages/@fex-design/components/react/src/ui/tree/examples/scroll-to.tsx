import { useRef, useState } from 'react'
import { Tree, type TreeInstance } from '@fex-design/react/ui/tree'
import { Button } from '@fex-design/react/ui/button'
import { treeDemoData } from './_data/tree-demo'
export default function Example() {
  const tree = useRef<TreeInstance<Record<string, unknown>>>(null)
  const [message, setMessage] = useState('')
  function locate() {
    const found = tree.current?.scrollTo('root-2-group-3-item-3', { reveal: true })
    setMessage(found ? '已定位 Item 2.3.3' : '未能定位目标节点')
  }
  return (
    <div className="grid w-full gap-space-sm">
      <Button className="w-full" onClick={locate}>
        Scroll to Item 2.3.3
      </Button>
      <Tree ref={tree} treeData={treeDemoData} classNames={{ viewport: 'h-48 overflow-y-auto' }} />
      <output className="min-h-5 text-xs text-muted-foreground" aria-live="polite">
        {message}
      </output>
    </div>
  )
}
