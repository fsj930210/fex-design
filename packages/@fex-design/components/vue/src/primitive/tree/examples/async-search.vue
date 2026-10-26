<script setup lang="ts">
import { computed, shallowRef, ref, onMounted, onUnmounted } from 'vue'
import {
  TreeRoot,
  TreeViewport,
  TreeItem,
  TreeTrigger,
  TreeTitle,
  expansionFeature,
  asyncLoadFeature,
} from '@fex-design/vue/primitive/tree'
import { SelectRoot, SelectTrigger, SelectContent } from '@fex-design/vue/primitive/select'
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
const features = [
  expansionFeature<Record<string, unknown>>(),
  asyncLoadFeature<Record<string, unknown>>({ loadChildren }),
]
const rootOptions = computed(() => ({ treeData: treeData.value, features }))
const pathOptions = computed(() => ({
  treeData: path.value?.treeData ?? [],
  defaultExpandedKeys: path.value?.expandedKeys ?? [],
  features: [expansionFeature<Record<string, unknown>>()],
}))
</script>
<template>
  <div class="grid gap-space-sm">
    <SelectRoot
      :options="matches"
      :value="selected ?? []"
      show-search
      clearable
      :filter-option="() => true"
      :loading="loading"
      @search="search"
      @change="choose"
      ><SelectTrigger class="w-72 max-w-full" placeholder="搜索部门或节点" /><SelectContent
        ><template #loading>搜索中…</template
        ><template #empty>没有匹配节点</template></SelectContent
      ></SelectRoot
    >
    <p class="text-xs text-muted-foreground">
      可搜索：Department 2、Group 2.3、Item 2.3.3；清除选择恢复原树。
    </p>
    <div :hidden="Boolean(selected)">
      <TreeRoot :options="rootOptions"
        ><TreeViewport v-slot="{ item }"
          ><TreeItem :item-key="item.key" v-slot="state"
            ><div :ref="state.setItemRef" v-bind="state.itemProps">
              <TreeTrigger :item-key="item.key" /><TreeTitle>{{ item.data.title }}</TreeTitle>
            </div></TreeItem
          ></TreeViewport
        ></TreeRoot
      >
    </div>
    <p v-if="locating" role="status">正在加载祖先路径…</p>
    <template v-if="path"
      ><div :key="selected">
        <TreeRoot :options="pathOptions"
          ><TreeViewport v-slot="{ item }"
            ><TreeItem :item-key="item.key" v-slot="state"
              ><div :ref="state.setItemRef" v-bind="state.itemProps">
                <TreeTrigger :item-key="item.key" /><TreeTitle>{{ item.data.title }}</TreeTitle>
              </div></TreeItem
            ></TreeViewport
          ></TreeRoot
        >
      </div></template
    >
  </div>
</template>
