<script setup lang="ts" generic="TNode extends TreeNodeData">
import type { CheckFeatureApi } from '@fex-design/core/tree/features/check'
import type { TreeKey, TreeNodeData } from '@fex-design/core/tree/types'
import { cn } from '@fex-design/utils'
import {
  CheckboxRoot,
  CheckboxControl,
  CheckboxIndicator,
} from '@fex-design/vue/primitive/checkbox'
import { computed, useAttrs } from 'vue'
import { useTreeContext } from './context'
import { useTreeItem } from './use-tree-item'

defineOptions({ inheritAttrs: false })
const props = defineProps<{ itemKey: TreeKey }>()
const attrs = useAttrs()
const { tree } = useTreeContext<TNode>('TreeCheckbox')
const state = useTreeItem(tree, props.itemKey)
const check = tree.getFeature<CheckFeatureApi>('check')
const inputAttrs = computed(() => {
  const { class: className, onChange: _onChange, ...rest } = attrs
  return { ...rest, class: cn('size-4 shrink-0', className as string | undefined) }
})
function change(event: Event) {
  const listener = attrs.onChange
  if (typeof listener === 'function') listener(event)
  if (!event.defaultPrevented)
    check?.check(props.itemKey, (event.target as HTMLInputElement).checked)
}
</script>

<template>
  <CheckboxRoot
    v-if="state.item?.checkable && check"
    data-slot="tree-checkbox"
    class="shrink-0"
    :disabled="state.item.disabled || state.item.disableCheckbox"
    ><CheckboxControl
      v-bind="inputAttrs"
      :tabindex="tree.hasFeature('keyboard') ? -1 : undefined"
      :checked="state.checked"
      :indeterminate="state.checkedState === 'indeterminate'"
      :aria-checked="state.checkedState === 'indeterminate' ? 'mixed' : state.checked"
      @click.stop
      @change="change" /><CheckboxIndicator
  /></CheckboxRoot>
</template>
