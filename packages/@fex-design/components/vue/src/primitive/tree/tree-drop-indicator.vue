<script setup lang="ts" generic="TNode extends TreeNodeData">
import type { TreeDropIntent } from '@fex-design/core/tree/features/dnd'
import type { TreeNode, TreeNodeData } from '@fex-design/core/tree/types'
import { treeDropIndicatorClassName } from '@fex-design/components-styles/tree'
import { cn } from '@fex-design/utils'
import { computed, useAttrs } from 'vue'
import { useTreeContext } from './context'

defineOptions({ inheritAttrs: false })
const props = defineProps<{ item?: TreeNode<TNode>; intent?: TreeDropIntent | null }>()
const attrs = useAttrs()
const { indent } = useTreeContext<TNode>('TreeDropIndicator')
const visible = computed(
  () => !!props.intent?.valid && (!props.item || props.intent.targetKey === props.item.key),
)
const style = computed(() => ({
  ...(attrs.style as object),
  left: props.intent?.position === 'inside' ? `${indent.value}px` : '4px',
  bottom: '0',
  transform: 'translateY(1px)',
}))
</script>
<template>
  <span
    v-if="visible"
    v-bind="attrs"
    data-slot="tree-drop-indicator"
    :data-position="props.intent?.position"
    :class="cn(treeDropIndicatorClassName, attrs.class as string)"
    :style="style"
  />
</template>
