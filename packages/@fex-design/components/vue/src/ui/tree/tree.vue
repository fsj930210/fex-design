<script setup lang="ts" generic="TNode extends Record<string, unknown>">
import type { TreeBehaviorProps } from './tree-types'
import { createTreeSetup } from './tree-setup'
import { createTreeInstance } from './tree-instance'
import { useTree } from '@fex-design/vue/primitive/tree'
import type { TreeController, TreeVisibleItem } from '@fex-design/vue/primitive/tree'
import {
  TreeCheckbox,
  TreeItem,
  TreeRoot,
  TreeTitle,
  TreeTrigger,
  TreeViewport,
  TreeVirtualViewport,
} from '@fex-design/vue/primitive/tree'
import { Spinner } from '@fex-design/vue/ui/spinner'
import { computed, ref, useAttrs, type StyleValue } from 'vue'

defineOptions({ name: 'Tree', inheritAttrs: false })
const props = withDefaults(
  defineProps<
    TreeBehaviorProps<TNode> & {
      virtual?: boolean
      virtualHeight?: number
      virtualOverscan?: number
      checkable?: boolean
      block?: boolean
      draggable?: boolean
      classNames?: Partial<
        Record<
          'root' | 'viewport' | 'item' | 'trigger' | 'checkbox' | 'title' | 'dropIndicator',
          string
        >
      >
      styles?: Partial<
        Record<
          'root' | 'viewport' | 'item' | 'trigger' | 'checkbox' | 'title' | 'dropIndicator',
          StyleValue
        >
      >
      onItemClick?: (event: MouseEvent, item: TreeVisibleItem<TNode>) => void
      onItemDoubleClick?: (event: MouseEvent, item: TreeVisibleItem<TNode>) => void
      onItemContextMenu?: (event: MouseEvent, item: TreeVisibleItem<TNode>) => void
    }
  >(),
  {
    virtual: false,
    virtualHeight: 320,
    virtualOverscan: 6,
    checkable: false,
    checkStrict: false,
    block: false,
    draggable: false,
    droppable: true,
    selectable: true,
  },
)
defineSlots<{
  renderItem(props: { item: TreeVisibleItem<TNode>; tree: TreeController<TNode> }): any
}>()
const dndCallbacks = computed(() => ({
  onDragStart: props.onDragStart,
  onDragEnter: props.onDragEnter,
  onDragOver: props.onDragOver,
  onDragLeave: props.onDragLeave,
  onDrop: props.onDrop,
  onDragEnd: props.onDragEnd,
}))
const attrs = useAttrs()
const rootAttrs = computed(() => attrs)
const viewport = ref<{ scrollTo(key: string | number, options?: { reveal?: boolean }): boolean }>()
const emit = defineEmits<{
  'update:expandedKeys': [keys: readonly (string | number)[]]
  'update:selectedKeys': [keys: readonly (string | number)[]]
  'update:checkedKeys': [keys: readonly (string | number)[]]
}>()
const setup = createTreeSetup<TNode>()
const treeController = useTree(() =>
  setup({
    ...props,
    onExpand: (keys, meta) => {
      emit('update:expandedKeys', keys)
      props.onExpand?.(keys, meta)
    },
    onSelect: (keys, meta) => {
      emit('update:selectedKeys', keys)
      props.onSelect?.(keys, meta)
    },
    onCheck: (keys, meta) => {
      emit('update:checkedKeys', keys)
      props.onCheck?.(keys, meta)
    },
  }),
)
defineExpose(
  createTreeInstance(
    () => treeController,
    () => viewport.value,
  ),
)
</script>
<template>
  <TreeRoot
    v-bind="rootAttrs"
    :class="[attrs.class, props.classNames?.root]"
    :style="[attrs.style, props.styles?.root]"
    :controller="treeController"
    :aria-disabled="props.disabled || undefined"
    :indent="props.indent"
    :row-height="props.rowHeight"
    v-slot="{ tree }"
  >
    <TreeVirtualViewport
      ref="viewport"
      :class="props.classNames?.viewport"
      :style="props.styles?.viewport"
      v-if="props.virtual"
      :height="props.virtualHeight"
      :overscan="props.virtualOverscan"
      v-slot="{ item }"
    >
      <TreeItem
        :class="props.classNames?.item"
        :style="props.styles?.item"
        :item-key="item.key"
        :block="props.block"
        :dnd-callbacks="dndCallbacks"
        v-slot="state"
        ><div
          :ref="state.setItemRef"
          v-bind="state.itemProps"
          @click="
            state.itemProps.onClick?.($event)
            props.onItemClick?.($event, item)
          "
          @dblclick="props.onItemDoubleClick?.($event, item)"
          @contextmenu="props.onItemContextMenu?.($event, item)"
        >
          <slot name="renderItem" :item="item" :tree="tree"
            ><Spinner
              v-if="state.loadState === 'loading'"
              size="sm"
              aria-label="Loading children"
            /><TreeTrigger
              :class="props.classNames?.trigger"
              :style="props.styles?.trigger"
              v-else
              :item-key="state.item.key"
            /><TreeCheckbox
              :class="props.classNames?.checkbox"
              :style="props.styles?.checkbox"
              v-if="state.item.checkable"
              :item-key="state.item.key"
            /><TreeTitle :class="props.classNames?.title" :style="props.styles?.title">{{
              String(state.item.title)
            }}</TreeTitle></slot
          >
        </div></TreeItem
      >
    </TreeVirtualViewport>
    <TreeViewport
      ref="viewport"
      :class="props.classNames?.viewport"
      :style="props.styles?.viewport"
      v-else
      v-slot="{ item }"
    >
      <TreeItem
        :class="props.classNames?.item"
        :style="props.styles?.item"
        :item-key="item.key"
        :block="props.block"
        :draggable="item.draggable"
        :dnd-callbacks="dndCallbacks"
        v-slot="state"
        ><div
          :ref="state.setItemRef"
          v-bind="state.itemProps"
          @click="
            state.itemProps.onClick?.($event)
            props.onItemClick?.($event, item)
          "
          @dblclick="props.onItemDoubleClick?.($event, item)"
          @contextmenu="props.onItemContextMenu?.($event, item)"
        >
          <slot name="renderItem" :item="item" :tree="tree"
            ><Spinner
              v-if="state.loadState === 'loading'"
              size="sm"
              aria-label="Loading children"
            /><TreeTrigger
              :class="props.classNames?.trigger"
              :style="props.styles?.trigger"
              v-else
              :item-key="state.item.key"
            /><TreeCheckbox
              :class="props.classNames?.checkbox"
              :style="props.styles?.checkbox"
              v-if="state.item.checkable"
              :item-key="state.item.key"
            /><TreeTitle :class="props.classNames?.title" :style="props.styles?.title">{{
              String(state.item.title)
            }}</TreeTitle></slot
          >
        </div></TreeItem
      >
    </TreeViewport>
  </TreeRoot>
</template>
