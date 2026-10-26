<script setup lang="ts">
import { computed, shallowRef, ref, onMounted, onUnmounted } from 'vue'
import { Tree } from '@fex-design/vue/ui/tree'
import { Select } from '@fex-design/vue/ui/select'
import {
  loadRemoteTree,
  searchRemoteTree,
  loadRemoteAncestors,
  updateRemoteChildren,
  type TreeSearchMatch,
  type TreeAncestorResult,
} from './_data/tree-remote-demo'
const treeData = shallowRef<readonly Record<string, unknown>[]>([])
const matches = shallowRef<TreeSearchMatch[]>([])
const selected = ref<string>()
const path = shallowRef<TreeAncestorResult>()
const loading = ref(false)
const locating = ref(false)
let searchId = 0,
  pathId = 0,
  active = true
onMounted(async () => {
  const roots = await loadRemoteTree()
  if (active) treeData.value = roots
})
onUnmounted(() => {
  active = false
  searchId++
  pathId++
})
async function search(keyword: string) {
  const request = ++searchId
  loading.value = true
  const result = await searchRemoteTree(keyword)
  if (request !== searchId) return
  matches.value = result
  loading.value = false
}
async function choose(value: unknown) {
  const request = ++pathId
  searchId++
  loading.value = false
  path.value = undefined
  if (typeof value !== 'string') {
    selected.value = undefined
    matches.value = []
    locating.value = false
    return
  }
  selected.value = value
  locating.value = true
  const result = await loadRemoteAncestors(value)
  if (request !== pathId) return
  path.value = result
  locating.value = false
}
async function loadChildren(item: { key: string | number }) {
  const children = await loadRemoteTree(String(item.key))
  treeData.value = updateRemoteChildren(treeData.value, String(item.key), children)
}

const rootProps = computed(() => ({ treeData: treeData.value, loadChildren: loadChildren }))
const pathProps = computed(() => ({
  treeData: path.value?.treeData ?? [],
  defaultExpandedKeys: path.value?.expandedKeys ?? [],
}))
</script>
<template>
  <div class="grid gap-space-sm">
    <Select
      class="w-72 max-w-full"
      :options="matches"
      :model-value="selected ?? []"
      searchable
      clearable
      :filter-option="() => true"
      :loading="loading"
      placeholder="搜索部门或节点"
      @search="search"
      @change="choose"
      ><template #loading>搜索中…</template><template #empty>没有匹配节点</template></Select
    >
    <p class="text-xs text-muted-foreground">
      可搜索：Department 2、Group 2.3、Item 2.3.3；清除选择恢复原树。
    </p>
    <div :hidden="Boolean(selected)"><Tree v-bind="rootProps" /></div>
    <p v-if="locating" role="status">正在加载祖先路径…</p>
    <template v-if="path"
      ><div :key="selected"><Tree v-bind="pathProps" /></div
    ></template>
  </div>
</template>
