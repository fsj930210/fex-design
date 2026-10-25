import { useRef, useState } from 'react'
import { Tree, type TreeInstance, type TreeDataNode } from '@fex-design/react/ui/tree'
import { Button } from '@fex-design/react/ui/button'
import { treeDemoData } from './_data/tree-demo'
type Action = 'expand' | 'scroll' | 'select' | 'check' | 'path' | 'reset'
export default function InstanceExample() {
  const tree = useRef<TreeInstance<TreeDataNode<string, string>>>(null)
  const [message, setMessage] = useState('点击按钮调用 Tree 实例方法')
  const [selected, setSelected] = useState<readonly (string | number)[]>([])
  const [checked, setChecked] = useState<readonly (string | number)[]>([])
  function run(action: Action) {
    const api = tree.current
    if (!api) return
    const target = 'root-2-group-3-item-3'
    if (action === 'expand') {
      api.expand('root-2')
      api.expand('root-2-group-3')
      setMessage('已展开 Department 2 和 Group 2.3')
    } else if (action === 'scroll') {
      const found = api.scrollTo(target, { reveal: true })
      setMessage(found ? '已提交 Item 2.3.3 定位' : '目标节点未加载或不存在')
    } else if (action === 'select') {
      api.select(target)
      setMessage('已追加选择 Item 2.3.3，保留其他选择')
    } else if (action === 'check') {
      api.check(target)
      setMessage('已追加勾选 Item 2.3.3，保留其他勾选')
    } else if (action === 'path') {
      setMessage(
        String(api.getNode(target)?.title) +
          '：' +
          api.getPath(target).join(' → ') +
          '；根节点数：' +
          api.getTreeData().length,
      )
    } else {
      api.clearSelection()
      api.clearChecked()
      api.collapseAll()
      setMessage('已清空选择、勾选并收起全部节点')
    }
  }
  return (
    <section className="grid w-full gap-space-sm">
      <p className="text-xs text-muted-foreground">
        通过组件实例调用方法；展开、选择和勾选均由实例执行，保留已有状态。
      </p>
      <div className="flex flex-wrap gap-2">
        <Button onClick={() => run('expand')}>展开 Department 2 / Group 2.3</Button>
        <Button onClick={() => run('scroll')}>定位 Item 2.3.3</Button>
        <Button onClick={() => run('select')}>追加选择 Item 2.3.3</Button>
        <Button onClick={() => run('check')}>追加勾选 Item 2.3.3</Button>
        <Button onClick={() => run('path')}>读取节点与路径</Button>
        <Button onClick={() => run('reset')}>清空并收起</Button>
      </div>
      <Tree
        ref={tree}
        treeData={treeDemoData}
        multiple
        checkable
        onSelect={setSelected}
        onCheck={setChecked}
        classNames={{ viewport: 'h-48 overflow-y-auto' }}
      />
      <output className="min-h-10 break-all text-xs text-muted-foreground" aria-live="polite">
        选择：{selected.join(', ') || '无'}；勾选：{checked.join(', ') || '无'}
      </output>
      <output className="min-h-10 break-all text-xs text-muted-foreground" aria-live="polite">
        {message}
      </output>
    </section>
  )
}
