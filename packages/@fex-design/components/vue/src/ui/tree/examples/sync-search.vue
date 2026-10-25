<script setup lang="ts">
import { ChevronDownIcon } from '@fex-design/vue/icons/chevron-down'
import { treeTriggerClassName, treeTitleClassName } from '@fex-design/components-styles/tree'

import { ref, computed } from 'vue'
import { Tree } from '@fex-design/vue/ui/tree'
import { Input } from '@fex-design/vue/ui/input'
import {
  filterTreeDemoData,
  getTreeSearchExpandedKeys,
  splitTreeSearchTitle,
} from './_data/tree-search-demo'
const keyword = ref('')
const expandedKeys = ref<readonly (string | number)[]>([])
function search(value: string) {
  keyword.value = value
  expandedKeys.value = getTreeSearchExpandedKeys(value)
}

const treeProps = computed(() => ({
  treeData: filterTreeDemoData(keyword.value),
  expandedKeys: expandedKeys.value,
}))
function toggle(tree: { getFeature<T>(id: string): T | undefined }, key: string | number) {
  tree.getFeature<{ toggle(key: string | number): void }>('expansion')?.toggle(key)
}
</script>
<template>
  <div class="grid w-full gap-space-sm">
    <Input
      :model-value="keyword"
      @update:model-value="search"
      placeholder="Search tree"
      aria-label="Search tree"
    />
    <div class="max-h-64 overflow-y-auto">
      <Tree v-bind="treeProps" @expand="(keys) => (expandedKeys = keys)"
        ><template #renderItem="{ item, tree }"
          ><button
            v-if="!item.isLeaf"
            type="button"
            :class="treeTriggerClassName"
            :aria-expanded="expandedKeys.includes(item.key)"
            :aria-label="'展开或收起 ' + item.data.title"
            @click.stop="toggle(tree, item.key)"
          >
            <ChevronDownIcon class="size-4" /></button
          ><span v-else class="size-5 shrink-0" /><span :class="treeTitleClassName"
            >{{ splitTreeSearchTitle(String(item.data.title), keyword).before
            }}<mark
              v-if="splitTreeSearchTitle(String(item.data.title), keyword).match"
              class="rounded-sm bg-warning/20 px-0.5 text-inherit"
              >{{ splitTreeSearchTitle(String(item.data.title), keyword).match }}</mark
            >{{ splitTreeSearchTitle(String(item.data.title), keyword).after }}</span
          ></template
        ></Tree
      >
    </div>
  </div>
</template>
