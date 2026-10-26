<script setup lang="ts">
import { ref, shallowRef, computed } from 'vue'
import { Tree, type useTree } from '@fex-design/vue/ui/tree'
import { Button } from '@fex-design/vue/ui/button'
import CrudRow from './crud-row.vue'
import { treeCrudData } from './_data/tree-crud-demo'
import { createTreeDemoService } from './_data/tree-edit-demo'
type CrudTree = ReturnType<typeof useTree<Record<string, unknown>>>
const service = createTreeDemoService(treeCrudData)
const treeData = shallowRef<readonly Record<string, unknown>[]>(treeCrudData)
const expandedKeys = ref<readonly (string | number)[]>(['department-1', 'group-1'])
const busy = ref(false)
const message = ref('修改接口成功后重新获取树，外部 treeData 是唯一数据源')
const props = computed(() => ({ treeData: treeData.value }))
async function run(operation: () => Promise<void>, success: string, parentKey?: string | number) {
  if (busy.value) return
  busy.value = true
  message.value = '正在提交修改并重新获取树…'
  try {
    await operation()
    treeData.value = await service.fetchTree()
    if (parentKey !== undefined && !expandedKeys.value.includes(parentKey))
      expandedKeys.value = [...expandedKeys.value, parentKey]
    message.value = success
  } catch (error) {
    message.value = error instanceof Error ? error.message : '操作失败，保留原数据'
  } finally {
    busy.value = false
  }
}
function addRoot() {
  return run(() => service.create(null), '已新增根节点，已重新获取 treeData')
}
function save(key: string | number, title: string) {
  return run(() => service.rename(key, title), '已更新名称，已重新获取 treeData')
}
function addChild(parentKey: string | number) {
  return run(() => service.create(parentKey), '已新增子节点，已重新获取 treeData', parentKey)
}
function remove(key: string | number) {
  return run(() => service.remove(key), '已删除节点，已重新获取 treeData')
}
function toggle(api: CrudTree, key: string | number) {
  api.getFeature<{ toggle(key: string | number): void }>('expansion')?.toggle(key)
}
</script>
<template>
  <section class="grid w-full gap-space-sm">
    <p class="text-sm text-muted-foreground">
      双击名称编辑；Enter 或失焦保存，Escape 取消；删除节点会删除其整个子树。
    </p>
    <div class="flex gap-2"><Button @click="addRoot" :disabled="busy">新增根节点</Button></div>
    <div class="h-64 overflow-y-auto p-1">
      <Tree :row-height="40" v-bind="props" v-model:expanded-keys="expandedKeys" block
        ><template #renderItem="{ item, tree: api }"
          ><CrudRow
            :title="String(item.title)"
            :leaf="item.isLeaf"
            :expanded="api.getSnapshot().expandedKeys.includes(item.key)"
            :busy="busy"
            @toggle="toggle(api, item.key)"
            @save="save(item.key, $event)"
            @add="addChild(item.key)"
            @remove="remove(item.key)" /></template
      ></Tree>
    </div>
    <output class="text-xs text-muted-foreground" aria-live="polite">{{ message }}</output>
  </section>
</template>
