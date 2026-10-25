<script setup lang="ts">
import type { TreeDataNode } from '@fex-design/vue/primitive/tree'

import { computed, ref } from 'vue'
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
} from '@fex-design/vue/primitive/tree'
import { Button } from '@fex-design/vue/primitive/button'
import { treeDemoData } from './_data/tree-demo'
const props = defineProps<{
  kind: 'expanded' | 'selected' | 'checked'
  controlled: boolean
  multiple?: boolean
  strict?: boolean
  data?: readonly TreeDataNode<string, string>[]
}>()
const initial = props.kind === 'expanded' ? ['root-1'] : ['root-1-group-1-item-1']
const keys = ref<readonly (string | number)[]>(initial)
const change = (next: readonly (string | number)[]) => {
  keys.value = next
}
const options = computed(() => ({
  treeData: props.data ?? treeDemoData,
  features: [
    expansionFeature<TreeDataNode<string, string>>(),
    ...(props.kind === 'selected'
      ? [selectionFeature<TreeDataNode<string, string>>({ multiple: props.multiple ?? false })]
      : []),
    ...(props.kind === 'checked'
      ? [checkFeature<TreeDataNode<string, string>>({ mode: props.strict ? 'strict' : 'cascade' })]
      : []),
  ],
  ...(props.kind !== 'expanded' ? { defaultExpandedKeys: ['root-1', 'root-1-group-1'] } : {}),
  ...(props.controlled
    ? { [props.kind + 'Keys']: keys.value }
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
  keys.value =
    props.kind === 'selected' && !props.multiple
      ? additions
      : [...new Set([...keys.value, ...additions])]
}
</script>
<template>
  <section class="grid w-full gap-space-sm">
    <h3 class="font-medium">
      {{ controlled ? '受控' : '非受控' }} ·
      {{
        kind === 'expanded'
          ? '展开 / 收起'
          : kind === 'selected'
            ? multiple
              ? '多选'
              : '单选'
            : strict
              ? '严格勾选'
              : '父子级联'
      }}
    </h3>
    <p v-if="kind === 'selected'" class="text-xs text-muted-foreground">
      Item 1.1.3 设置 selectable: false：不可选择，其他节点仍可正常选择。
    </p>
    <p v-if="kind === 'checked'" class="text-xs text-muted-foreground">
      Item 1.1.3 设置 disableCheckbox: true：不可勾选，也不参与父子级联。
    </p>
    <div v-if="controlled" class="flex flex-wrap gap-2">
      <Button @click="append">{{
        kind === 'expanded'
          ? '追加展开 Department 2 / Group 2.3'
          : multiple
            ? '追加选择 Item 1.1.1 和 1.1.2'
            : kind === 'checked'
              ? '追加勾选 Item 1.1.2'
              : '选择 Item 1.1.2（单选）'
      }}</Button
      ><Button @click="keys = []">{{ kind === 'expanded' ? '全部收起' : '清空' }}</Button
      ><Button @click="keys = initial">重置</Button>
    </div>
    <div class="h-48 overflow-y-auto">
      <TreeRoot :options="options"
        ><TreeViewport v-slot="{ item }"
          ><TreeItem :item-key="item.key" v-slot="state"
            ><div :ref="state.setItemRef" v-bind="state.itemProps">
              <TreeTrigger :item-key="item.key" /><TreeCheckbox
                v-if="kind === 'checked'"
                :item-key="item.key"
              /><TreeTitle>{{ item.data.title }}</TreeTitle>
            </div></TreeItem
          ></TreeViewport
        ></TreeRoot
      >
    </div>
    <output class="break-all text-xs text-muted-foreground" aria-live="polite"
      >{{ kind }}Keys：{{ keys.join(', ') || '无' }}</output
    >
  </section>
</template>
