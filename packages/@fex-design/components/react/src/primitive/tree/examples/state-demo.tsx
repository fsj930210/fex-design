import type { TreeDataNode } from '@fex-design/react/primitive/tree'
import { useState } from 'react'
import { Button } from '@fex-design/react/primitive/button'
import {
  expansionFeature,
  selectionFeature,
  checkFeature,
  TreeRoot,
  TreeViewport,
  TreeItem,
  TreeTrigger,
  TreeCheckbox,
  TreeTitle,
} from '@fex-design/react/primitive/tree'
import { treeDemoData } from './_data/tree-demo'

type Kind = 'expanded' | 'selected' | 'checked'
export function StateDemo({
  kind,
  controlled,
  strict = false,
  multiple = false,
  data = treeDemoData,
}: {
  kind: Kind
  controlled: boolean
  strict?: boolean
  multiple?: boolean
  data?: readonly TreeDataNode<string, string>[]
}) {
  const initial = kind === 'expanded' ? ['root-1'] : ['root-1-group-1-item-1']
  const [keys, setKeys] = useState<readonly (string | number)[]>(initial)
  const [features] = useState(() => [
    expansionFeature<TreeDataNode<string, string>>(),
    ...(kind === 'selected' ? [selectionFeature<TreeDataNode<string, string>>({ multiple })] : []),
    ...(kind === 'checked'
      ? [checkFeature<TreeDataNode<string, string>>({ mode: strict ? 'strict' : 'cascade' })]
      : []),
  ])
  const options = {
    treeData: data,
    features,
    ...(kind !== 'expanded' ? { defaultExpandedKeys: ['root-1', 'root-1-group-1'] } : {}),
    ...(controlled
      ? { [kind + 'Keys']: keys }
      : {
          ['default' + kind[0]!.toUpperCase() + kind.slice(1) + 'Keys']: initial,
        }),
    ...(kind === 'expanded' ? { onExpandedKeysChange: setKeys } : {}),
    ...(kind === 'selected' ? { onSelectedKeysChange: setKeys } : {}),
    ...(kind === 'checked' ? { onCheckedKeysChange: setKeys } : {}),
  }
  return (
    <section className="grid w-full gap-space-sm">
      <h3 className="font-medium">
        {controlled ? '受控' : '非受控'}
        {kind === 'expanded' ? ' · 展开 / 收起' : ''}
        {kind === 'checked' ? (strict ? ' · 严格勾选' : ' · 父子级联') : ''}
        {kind === 'selected' ? (multiple ? ' · 多选' : ' · 单选') : ''}
      </h3>
      {kind === 'selected' && (
        <p className="text-xs text-muted-foreground">
          Item 1.1.3 设置 selectable: false：不可选择，其他节点仍可正常选择。
        </p>
      )}
      {kind === 'checked' && (
        <p className="text-xs text-muted-foreground">
          Item 1.1.3 设置 disableCheckbox: true：不可勾选，也不参与父子级联。
        </p>
      )}
      {controlled ? (
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={() => {
              const additions =
                kind === 'expanded'
                  ? ['root-2', 'root-2-group-3']
                  : multiple
                    ? ['root-1-group-1-item-1', 'root-1-group-1-item-2']
                    : ['root-1-group-1-item-2']
              setKeys((current) =>
                kind === 'selected' && !multiple
                  ? additions
                  : [...new Set([...current, ...additions])],
              )
            }}
          >
            {kind === 'expanded'
              ? '追加展开 Department 2 / Group 2.3'
              : multiple
                ? '追加选择 Item 1.1.1 和 1.1.2'
                : kind === 'checked'
                  ? '追加勾选 Item 1.1.2'
                  : '选择 Item 1.1.2（单选）'}
          </Button>
          <Button onClick={() => setKeys([])}>{kind === 'expanded' ? '全部收起' : '清空'}</Button>
          <Button onClick={() => setKeys(initial)}>重置</Button>
        </div>
      ) : null}
      <div className="h-48 overflow-y-auto">
        <TreeRoot options={options}>
          <TreeViewport>
            {(item) => (
              <TreeItem key={item.key} itemKey={item.key}>
                {(state) => (
                  <div {...state.itemProps}>
                    <TreeTrigger itemKey={item.key} />
                    {kind === 'checked' ? <TreeCheckbox itemKey={item.key} /> : null}
                    <TreeTitle>{String(item.data.title)}</TreeTitle>
                  </div>
                )}
              </TreeItem>
            )}
          </TreeViewport>
        </TreeRoot>
      </div>
      <output className="break-all text-xs text-muted-foreground" aria-live="polite">
        {kind}Keys：{keys.join(', ') || '无'}
      </output>
    </section>
  )
}
