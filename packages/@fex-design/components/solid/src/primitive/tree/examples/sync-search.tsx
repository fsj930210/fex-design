import type { TreeDataNode } from '@fex-design/solid/primitive/tree'
import { createSignal, createMemo, Show } from 'solid-js'
import {
  TreeRoot,
  TreeViewport,
  TreeItem,
  TreeTrigger,
  TreeTitle,
  expansionFeature,
} from '@fex-design/solid/primitive/tree'
import { InputRoot, InputControl } from '@fex-design/solid/primitive/input'
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
  const features = [expansionFeature<TreeDataNode<string, string>>()]
  const options = createMemo(() => ({
    treeData: filterTreeDemoData(keyword()),
    expandedKeys: expandedKeys(),
    onExpandedKeysChange: setExpandedKeys,
    features,
  }))
  const title = (text: string) => {
    const parts = createMemo(() => splitTreeSearchTitle(text, keyword()))
    return (
      <span>
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
      <InputRoot value={keyword()} onValueChange={search}>
        <InputControl placeholder="Search tree" aria-label="Search tree" />
      </InputRoot>
      <div class="max-h-64 overflow-y-auto">
        <TreeRoot options={options()}>
          <TreeViewport>
            {(item) => (
              <TreeItem itemKey={item.key}>
                {(state) => (
                  <div {...state.itemProps}>
                    <TreeTrigger itemKey={item.key} />
                    <TreeTitle>{title(String(item.data.title))}</TreeTitle>
                  </div>
                )}
              </TreeItem>
            )}
          </TreeViewport>
        </TreeRoot>
      </div>
    </div>
  )
}
