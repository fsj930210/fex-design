import { createMemo, createSignal, Show } from 'solid-js'
import {
  TreeRoot,
  TreeViewport,
  TreeItem,
  TreeTrigger,
  TreeTitle,
  TreeCheckbox,
  expansionFeature,
  selectionFeature,
  checkFeature,
} from '@fex-design/solid/primitive/tree'
import { Button } from '@fex-design/solid/primitive/button'
import { treeDemoData } from './_data/tree-demo'
export function StateDemo(props: {
  kind: 'expanded' | 'selected' | 'checked'
  controlled: boolean
  multiple?: boolean
  strict?: boolean
  data?: readonly Record<string, unknown>[]
}) {
  const initial = props.kind === 'expanded' ? ['root-1'] : ['root-1-group-1-item-1']
  const [keys, setKeys] = createSignal<readonly (string | number)[]>(initial)
  const change = (next: readonly (string | number)[]) => setKeys(next)
  const options = createMemo(() => ({
    treeData: props.data ?? treeDemoData,
    features: [
      expansionFeature<Record<string, unknown>>(),
      ...(props.kind === 'selected'
        ? [selectionFeature<Record<string, unknown>>({ multiple: props.multiple ?? false })]
        : []),
      ...(props.kind === 'checked'
        ? [
            checkFeature<Record<string, unknown>>({
              mode: props.strict ? 'strict' : 'cascade',
            }),
          ]
        : []),
    ],
    ...(props.kind !== 'expanded' ? { defaultExpandedKeys: ['root-1', 'root-1-group-1'] } : {}),
    ...(props.controlled
      ? { [props.kind + 'Keys']: keys() }
      : { ['default' + props.kind[0]!.toUpperCase() + props.kind.slice(1) + 'Keys']: initial }),
    ...(props.kind === 'expanded' ? { onExpandedKeysChange: change } : {}),
    ...(props.kind === 'selected' ? { onSelectedKeysChange: change } : {}),
    ...(props.kind === 'checked' ? { onCheckedKeysChange: change } : {}),
  }))
  const append = () => {
    const additions =
      props.kind === 'expanded'
        ? ['root-2', 'root-2-group-3']
        : props.multiple
          ? ['root-1-group-1-item-1', 'root-1-group-1-item-2']
          : ['root-1-group-1-item-2']
    setKeys((current) =>
      props.kind === 'selected' && !props.multiple
        ? additions
        : [...new Set([...current, ...additions])],
    )
  }
  return (
    <section class="grid w-full gap-space-sm">
      <h3 class="font-medium">
        {props.controlled ? '受控' : '非受控'} ·{' '}
        {props.kind === 'expanded'
          ? '展开 / 收起'
          : props.kind === 'selected'
            ? props.multiple
              ? '多选'
              : '单选'
            : props.strict
              ? '严格勾选'
              : '父子级联'}
      </h3>
      {props.kind === 'selected' && (
        <p class="text-xs text-muted-foreground">
          Item 1.1.3 设置 selectable: false：不可选择，其他节点仍可正常选择。
        </p>
      )}
      {props.kind === 'checked' && (
        <p class="text-xs text-muted-foreground">
          Item 1.1.3 设置 disableCheckbox: true：不可勾选，也不参与父子级联。
        </p>
      )}
      <Show when={props.controlled}>
        <div class="flex flex-wrap gap-2">
          <Button onClick={append}>
            {props.kind === 'expanded'
              ? '追加展开 Department 2 / Group 2.3'
              : props.multiple
                ? '追加选择 Item 1.1.1 和 1.1.2'
                : props.kind === 'checked'
                  ? '追加勾选 Item 1.1.2'
                  : '选择 Item 1.1.2（单选）'}
          </Button>
          <Button onClick={() => setKeys([])}>
            {props.kind === 'expanded' ? '全部收起' : '清空'}
          </Button>
          <Button onClick={() => setKeys(initial)}>重置</Button>
        </div>
      </Show>
      <div class="h-48 overflow-y-auto">
        <TreeRoot options={options()}>
          <TreeViewport>
            {(item) => (
              <TreeItem itemKey={item.key}>
                {(state) => (
                  <div {...state.itemProps}>
                    <TreeTrigger itemKey={item.key} />
                    {props.kind === 'checked' && <TreeCheckbox itemKey={item.key} />}
                    <TreeTitle>{String(item.data.title)}</TreeTitle>
                  </div>
                )}
              </TreeItem>
            )}
          </TreeViewport>
        </TreeRoot>
      </div>
      <output class="break-all text-xs text-muted-foreground" aria-live="polite">
        {props.kind}Keys：{keys().join(', ') || '无'}
      </output>
    </section>
  )
}
