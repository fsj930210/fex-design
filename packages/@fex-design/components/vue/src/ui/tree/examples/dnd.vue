<script setup lang="ts">
import { ref, shallowRef, computed } from 'vue'
import { Tree, type TreeBehaviorProps } from '@fex-design/vue/ui/tree'
import { treeDndDemoData } from './_data/tree-demo'
import { createTreeDemoService } from './_data/tree-edit-demo'
const service = createTreeDemoService(treeDndDemoData)
const treeData = shallowRef<readonly Record<string, unknown>[]>(treeDndDemoData)
const expandedKeys = ref<readonly (string | number)[]>(['root-1', 'root-1-group-1'])
const busy = ref(false)
const message = ref('Item 1.1.2 不可拖动；Item 1.1.3 不可放置。放置后调用接口并重新获取树。')
const treeProps = computed(() => ({
  treeData: treeData.value,
  expandedKeys: expandedKeys.value,
  onExpand: (keys: readonly (string | number)[]) => (expandedKeys.value = keys),
  disabled: busy.value,
}))
const handleDrop: NonNullable<TreeBehaviorProps<Record<string, unknown>>['onDrop']> = async ({
  sourceItem,
  targetItem,
  intent,
}) => {
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
</script>
<template>
  <div class="w-[min(36rem,100%)] min-w-0">
    <p class="mb-space-sm min-h-10 break-all text-sm text-muted-foreground">{{ message }}</p>
    <Tree v-bind="treeProps" draggable @drop="handleDrop" />
  </div>
</template>
