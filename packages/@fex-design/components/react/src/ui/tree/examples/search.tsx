import { ChevronDownIcon } from '@fex-design/react/icons/chevron-down'
import { treeTriggerClassName, treeTitleClassName } from '@fex-design/components-styles/tree'

import { useState } from 'react'

import { Input } from '@fex-design/react/ui/input'
import { Tree } from '@fex-design/react/ui/tree'
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
export default function TreeSearchExample() {
  const [value, setValue] = useState('')
  const filteredTree = filterTreeDemoData(value)
  const [expandedKeys, setExpandedKeys] = useState<readonly (string | number)[]>([])
  function search(value: string) {
    setValue(value)
    setExpandedKeys(getTreeSearchExpandedKeys(value))
  }
  return (
    <div className="grid gap-space-lg">
      <section className="grid gap-space-sm">
        <h3 className="font-medium">同步搜索</h3>
        <div className="grid w-full gap-space-sm">
          <Input
            value={value}
            onChange={(event) => search(event.target.value)}
            placeholder="Search tree"
            aria-label="Search tree"
          />
          <div className="max-h-64 overflow-y-auto">
            <Tree
              treeData={filteredTree}
              expandedKeys={expandedKeys}
              onExpand={setExpandedKeys}
              renderItem={(item, tree) => (
                <>
                  {item.isLeaf ? (
                    <span className="size-5 shrink-0" />
                  ) : (
                    <button
                      type="button"
                      className={treeTriggerClassName}
                      aria-expanded={expandedKeys.includes(item.key)}
                      aria-label={'展开或收起 ' + item.data.title}
                      onClick={(event) => {
                        event.stopPropagation()
                        tree
                          .getFeature<{ toggle(key: string | number): void }>('expansion')
                          ?.toggle(item.key)
                      }}
                    >
                      <ChevronDownIcon className="size-4" />
                    </button>
                  )}
                  <span className={treeTitleClassName}>
                    {highlight(String(item.data.title), value)}
                  </span>
                </>
              )}
            />
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
