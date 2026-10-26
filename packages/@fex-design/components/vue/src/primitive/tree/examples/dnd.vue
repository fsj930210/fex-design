<script setup lang="ts">
import { ref, shallowRef, computed } from 'vue'
import {
  TreeRoot,
  TreeViewport,
  TreeItem,
  TreeTrigger,
  TreeTitle,
  dndFeature,
  expansionFeature,
  type useTreeDndItem,
} from '@fex-design/vue/primitive/tree'
import { treeDndDemoData } from './_data/tree-demo'
import { createTreeDemoService } from './_data/tree-edit-demo'
const service = createTreeDemoService(treeDndDemoData)
const treeData = shallowRef<readonly Record<string, unknown>[]>(treeDndDemoData)
const expandedKeys = ref<readonly (string | number)[]>(['root-1', 'root-1-group-1'])
const busy = ref(false)
const message = ref('Item 1.1.2 不可拖动；Item 1.1.3 不可放置。放置后调用接口并重新获取树。')
const features = [
  expansionFeature<Record<string, unknown>>(),
  dndFeature<Record<string, unknown>>(),
]
const options = computed(() => ({
  treeData: treeData.value,
  expandedKeys: expandedKeys.value,
  onExpandedKeysChange: (keys: readonly (string | number)[]) => (expandedKeys.value = keys),
  disabled: busy.value,
  features,
}))
const handleDrop: NonNullable<
  NonNullable<Parameters<typeof useTreeDndItem<Record<string, unknown>>>[0]['callbacks']>['onDrop']
> = async ({ sourceItem, targetItem, intent }) => {
  if (!intent?.valid || busy.value) return
  busy.value = true
  message.value = '正在提交移动并重新获取树…'
  try {
    await service.move({
      sourceKey: intent.sourceKey,
      parentKey: intent.parentKey,
      index: intent.index,
    })
    treeData.value = await service.fetchTree()
    if (intent.position === 'inside' && !expandedKeys.value.includes(intent.targetKey))
      expandedKeys.value = [...expandedKeys.value, intent.targetKey]
    message.value =
      String(sourceItem?.title) + ' → ' + String(targetItem?.title) + '；已更新外部 treeData'
  } catch (error) {
    message.value = error instanceof Error ? error.message : '移动失败，保留原数据'
  } finally {
    busy.value = false
  }
}
const callbacks = { onDrop: handleDrop }
</script>
<template>
  <div class="w-[min(36rem,100%)] min-w-0">
    <p class="mb-space-sm min-h-10 break-all text-sm text-muted-foreground">{{ message }}</p>
    <TreeRoot :options="options"
      ><TreeViewport v-slot="{ item }"
        ><TreeItem :item-key="item.key" draggable :dnd-callbacks="callbacks" v-slot="state"
          ><div :ref="state.setItemRef" v-bind="state.itemProps">
            <TreeTrigger :item-key="item.key" /><TreeTitle>{{ item.data.title }}</TreeTitle>
          </div></TreeItem
        ></TreeViewport
      ></TreeRoot
    >
  </div>
</template>
