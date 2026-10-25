import { ChevronDownIcon } from '@fex-design/solid/icons/chevron-down'
import { treeTriggerClassName, treeTitleClassName } from '@fex-design/components-styles/tree'

import { createSignal, createMemo, Show } from 'solid-js'
import { Tree } from '@fex-design/solid/ui/tree'
import { Input } from '@fex-design/solid/ui/input'
import {
  filterTreeDemoData,
  getTreeSearchExpandedKeys,
  splitTreeSearchTitle,
} from './_data/tree-search-demo'
export default function Example() {
  const [keyword, setKeyword] = createSignal('')

  const [expandedKeys, setExpandedKeys] = createSignal<readonly (string | number)[]>([])
  const search = (value: string) => {
    setKeyword(value)
    setExpandedKeys(getTreeSearchExpandedKeys(value))
  }
  const treeProps = createMemo(() => ({
    treeData: filterTreeDemoData(keyword()),
    expandedKeys: expandedKeys(),
    onExpand: setExpandedKeys,
  }))
  const title = (text: string) => {
    const parts = createMemo(() => splitTreeSearchTitle(text, keyword()))
    return (
      <span class={treeTitleClassName}>
        {parts().before}
        <Show when={parts().match}>
          <mark class="rounded-sm bg-warning/20 px-0.5 text-inherit">{parts().match}</mark>
        </Show>
        {parts().after}
      </span>
    )
  }
  return (
    <div class="grid w-full gap-space-sm">
      <Input
        value={keyword()}
        onValueChange={search}
        placeholder="Search tree"
        aria-label="Search tree"
      />
      <div class="max-h-64 overflow-y-auto">
        <Tree
          {...treeProps()}
          renderItem={(item, tree) => (
            <>
              <Show when={!item.isLeaf} fallback={<span class="size-5 shrink-0" />}>
                <button
                  type="button"
                  class={treeTriggerClassName}
                  aria-expanded={expandedKeys().includes(item.key)}
                  aria-label={'展开或收起 ' + item.data.title}
                  onClick={(event) => {
                    event.stopPropagation()
                    tree
                      .getFeature<{ toggle(key: string | number): void }>('expansion')
                      ?.toggle(item.key)
                  }}
                >
                  <ChevronDownIcon class="size-4" />
                </button>
              </Show>
              {title(String(item.data.title))}
            </>
          )}
        />
      </div>
    </div>
  )
}
