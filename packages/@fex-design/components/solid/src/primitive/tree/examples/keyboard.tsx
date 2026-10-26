import { createSignal } from 'solid-js'
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
} from '@fex-design/solid/primitive/tree'
import { treeDemoData } from './_data/tree-demo'
export default function Example() {
  const [focused, setFocused] = createSignal<string | number | null>(null),
    [selected, setSelected] = createSignal<readonly (string | number)[]>([]),
    [checked, setChecked] = createSignal<readonly (string | number)[]>([])
  const options = {
    treeData: treeDemoData,
    features: [
      expansionFeature<Record<string, unknown>>({
        defaultExpandedKeys: ['root-1', 'root-1-group-1'],
      }),
      focusFeature<Record<string, unknown>>(),
      keyboardFeature<Record<string, unknown>>(),
      selectionFeature<Record<string, unknown>>(),
      checkFeature<Record<string, unknown>>(),
    ],
    onFocusedKeyChange: setFocused,
    onSelectedKeysChange: setSelected,
    onCheckedKeysChange: setChecked,
  }
  return (
    <section class="grid w-full gap-space-sm">
      <p class="text-sm text-muted-foreground">
        逐次按 Tab 进入树，Shift+Tab 返回；进入后用 ↑/↓、Home/End 移动节点焦点，←/→
        收起或展开，Enter 选择，Space 勾选。再次按 Tab 离开树；鼠标悬停不会切换键盘焦点。
      </p>
      <div class="h-64 overflow-y-auto">
        <TreeRoot options={options}>
          <TreeViewport>
            {(item) => (
              <TreeItem itemKey={item.key}>
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
      <output class="break-all text-xs" aria-live="polite">
        焦点：{focused() ?? '无'}；选择：{selected().join(', ') || '无'}；勾选：
        {checked().join(', ') || '无'}
      </output>
    </section>
  )
}
