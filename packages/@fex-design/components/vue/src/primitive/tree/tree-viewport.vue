<script setup lang="ts" generic="TNode extends TreeNodeData">
import type { TreeKey, TreeNodeData } from '@fex-design/core/tree/types'
import { treeViewportClassName } from '@fex-design/components-styles/tree'
import { cn } from '@fex-design/utils'
import { computed, nextTick, ref, useAttrs } from 'vue'
import { useTreeContext } from './context'
import { useTreeVisibleItems } from './use-tree-visible-items'

defineOptions({ inheritAttrs: false })
const attrs = useAttrs()
const { tree } = useTreeContext<TNode>('TreeViewport')
const items = useTreeVisibleItems(tree)
const viewport = ref<HTMLElement | null>(null)
function scrollTo(
  key: TreeKey,
  options?: { reveal?: boolean; align?: 'auto' | 'start' | 'center' | 'end' },
) {
  if (options?.reveal && !tree.getFeature('focus')?.reveal(key)) return false
  if (options?.reveal) {
    void nextTick(() => scrollTo(key, { ...options, reveal: false }))
    return true
  }
  const item = Array.from(viewport.value?.querySelectorAll<HTMLElement>('[data-key]') ?? []).find(
    (node) => node.dataset.key === String(key),
  )
  if (!item) return false
  item.scrollIntoView({
    block: options?.align === 'auto' ? 'nearest' : (options?.align ?? 'nearest'),
  })
  return true
}
defineExpose({ scrollTo })
const viewportClass = computed(() => cn(treeViewportClassName, attrs.class as string | undefined))
const viewportAttrs = computed(() => {
  const { class: _class, ...rest } = attrs
  return rest
})
</script>

<template>
  <div ref="viewport" v-bind="viewportAttrs" data-slot="tree-viewport" :class="viewportClass">
    <slot v-for="item in items" :key="item.key" :item="item" :tree="tree" />
  </div>
</template>
