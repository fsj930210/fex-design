import { useState } from 'react'
import {
  expansionFeature,
  TreeItem,
  TreeRoot,
  TreeTitle,
  TreeTrigger,
  TreeViewport,
} from '@fex-design/react/primitive/tree'
import { InputControl, InputRoot } from '@fex-design/react/primitive/input'
import { filterTreeDemoData, getTreeSearchExpandedKeys } from './_data/tree-search-demo'
import AsyncSearchExample from './async-search'
function highlight(title: string, keyword: string) {
  const index = title.toLowerCase().indexOf(keyword.trim().toLowerCase())
  if (index < 0 || !keyword.trim()) return title
  return (
    <>
      {title.slice(0, index)}
      <mark className="rounded-sm bg-warning/20 px-0.5 text-inherit">
        {title.slice(index, index + keyword.trim().length)}
      </mark>
      {title.slice(index + keyword.trim().length)}
    </>
  )
}
export default function TreeSearchPrimitiveExample() {
  const [keyword, setKeyword] = useState('')
  const filteredTree = filterTreeDemoData(keyword)
  const [expandedKeys, setExpandedKeys] = useState<readonly (string | number)[]>([])
  function search(value: string) {
    setKeyword(value)
    setExpandedKeys(getTreeSearchExpandedKeys(value))
  }
  return (
    <div className="grid gap-space-lg">
      <section className="grid gap-space-sm">
        <h3 className="font-medium">同步搜索</h3>
        <div className="grid w-full gap-space-sm">
          <InputRoot value={keyword} onValueChange={search}>
            <InputControl placeholder="Search tree" aria-label="Search tree" />
          </InputRoot>
          <div className="max-h-64 overflow-y-auto">
            <TreeRoot
              options={{
                treeData: filteredTree,
                expandedKeys,
                onExpandedKeysChange: setExpandedKeys,
                features: [expansionFeature<Record<string, unknown>>()],
              }}
            >
              <TreeViewport>
                {(item) => (
                  <TreeItem key={item.key} itemKey={item.key}>
                    {(state) => (
                      <div {...state.itemProps}>
                        <TreeTrigger itemKey={item.key} />
                        <TreeTitle>{highlight(String(item.data.title), keyword)}</TreeTitle>
                      </div>
                    )}
                  </TreeItem>
                )}
              </TreeViewport>
            </TreeRoot>
          </div>
        </div>
      </section>
      <section className="grid gap-space-sm">
        <h3 className="font-medium">异步搜索</h3>
        <AsyncSearchExample />
      </section>
    </div>
  )
}
