<script setup lang="ts" generic="TNode extends TreeNodeData">
import { handleTreeKeyboard, focusTreeEntry } from '@fex-design/core/tree/keyboard-dom'
import type { SelectionFeatureApi } from '@fex-design/core/tree/features/selection'
import type { TreeController, TreeNodeData, TreeOptions } from '@fex-design/core/tree/types'
import { treeRootClassName } from '@fex-design/components-styles/tree'
import { cn } from '@fex-design/utils'
import { computed, provide, useAttrs } from 'vue'
import { treeContextKey, type TreeContextValue } from './context'
import { useTreeController } from './use-tree'

defineOptions({ inheritAttrs: false })
const props = withDefaults(
  defineProps<{
    options?: TreeOptions<TNode>
    controller?: TreeController<TNode>
    indent?: number
    rowHeight?: number
  }>(),
  { indent: 16, rowHeight: 32 },
)
const attrs = useAttrs()
const tree = useTreeController(
  () => props.options ?? (props.controller ? undefined : { treeData: [] }),
  props.controller,
)
const indent = computed(() => props.indent)
const rowHeight = computed(() => props.rowHeight)
provide(treeContextKey, { tree, indent, rowHeight } as unknown as TreeContextValue<TreeNodeData>)

const rootAttrs = computed(() => {
  const { class: _class, style: _style, onKeydown: _onKeydown, onFocus: _onFocus, ...rest } = attrs
  return { ...rest, ...(props.options?.disabled ? { 'aria-disabled': true } : {}) }
})
const rootClass = computed(() => cn(treeRootClassName, attrs.class as string | undefined))
const rootStyle = computed(() => attrs.style)
const selection = () => tree.getFeature<SelectionFeatureApi>('selection')

function handleKeydown(event: KeyboardEvent) {
  if (typeof attrs.onKeydown === 'function') attrs.onKeydown(event)
  handleTreeKeyboard(tree, event.currentTarget as HTMLElement, event)
}
function handleFocus(event: FocusEvent) {
  if (typeof attrs.onFocus === 'function') attrs.onFocus(event)
  if (!event.defaultPrevented)
    focusTreeEntry(tree, event.currentTarget as HTMLElement, event.target, event.relatedTarget)
}
</script>

<template>
  <div
    v-bind="rootAttrs"
    role="tree"
    data-slot="tree"
    tabindex="0"
    :aria-multiselectable="selection()?.isMultiple() || undefined"
    :class="rootClass"
    :style="rootStyle"
    @keydown="handleKeydown"
    @focus="handleFocus"
  >
    <slot :tree="tree" />
  </div>
</template>
