import type { TreeDataNode } from '@fex-design/react/primitive/tree'
import { useState } from 'react'
import {
  TreeRoot,
  TreeViewport,
  TreeItem,
  TreeTrigger,
  TreeTitle,
  TreeCheckbox,
  expansionFeature,
  focusFeature,
  keyboardFeature,
  selectionFeature,
  checkFeature,
} from '@fex-design/react/primitive/tree'
import { treeDemoData } from './_data/tree-demo'
export default function Example() {
  const [focused, setFocused] = useState<string | number | null>(null),
    [selected, setSelected] = useState<readonly (string | number)[]>([]),
    [checked, setChecked] = useState<readonly (string | number)[]>([])
  const [options] = useState(() => ({
    treeData: treeDemoData,
    features: [
      expansionFeature<TreeDataNode<string, string>>({
        defaultExpandedKeys: ['root-1', 'root-1-group-1'],
      }),
      focusFeature<TreeDataNode<string, string>>(),
      keyboardFeature<TreeDataNode<string, string>>(),
      selectionFeature<TreeDataNode<string, string>>(),
      checkFeature<TreeDataNode<string, string>>(),
    ],
    onFocusedKeyChange: setFocused,
    onSelectedKeysChange: setSelected,
    onCheckedKeysChange: setChecked,
  }))
  return (
    <section className="grid w-full gap-space-sm">
      <p className="text-sm text-muted-foreground">
        逐次按 Tab 进入树，Shift+Tab 返回；进入后用 ↑/↓、Home/End 移动节点焦点，←/→
        收起或展开，Enter 选择，Space 勾选。再次按 Tab 离开树；鼠标悬停不会切换键盘焦点。
      </p>
      <div className="h-64 overflow-y-auto">
        <TreeRoot options={options}>
          <TreeViewport>
            {(item) => (
              <TreeItem key={item.key} itemKey={item.key}>
                {(state) => (
                  <div {...state.itemProps}>
                    <TreeTrigger itemKey={item.key} />
                    <TreeCheckbox itemKey={item.key} />
                    <TreeTitle>{String(item.data.title)}</TreeTitle>
                  </div>
                )}
              </TreeItem>
            )}
          </TreeViewport>
        </TreeRoot>
      </div>
      <output className="break-all text-xs" aria-live="polite">
        焦点：{focused ?? '无'}；选择：{selected.join(', ') || '无'}；勾选：
        {checked.join(', ') || '无'}
      </output>
    </section>
  )
}
