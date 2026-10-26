<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  TreeRoot,
  TreeViewport,
  TreeItem,
  TreeTrigger,
  TreeTitle,
  expansionFeature,
} from '@fex-design/vue/primitive/tree'
import { InputRoot, InputControl } from '@fex-design/vue/primitive/input'
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
const features = [expansionFeature<Record<string, unknown>>()]
const options = computed(() => ({
  treeData: filterTreeDemoData(keyword.value),
  expandedKeys: expandedKeys.value,
  onExpandedKeysChange: (keys: readonly (string | number)[]) => (expandedKeys.value = keys),
  features,
}))
</script>
<template>
  <div class="grid w-full gap-space-sm">
    <InputRoot :value="keyword" @value-change="search"
      ><InputControl placeholder="Search tree" aria-label="Search tree"
    /></InputRoot>
    <div class="max-h-64 overflow-y-auto">
      <TreeRoot :options="options"
        ><TreeViewport v-slot="{ item }"
          ><TreeItem :item-key="item.key" v-slot="state"
            ><div :ref="state.setItemRef" v-bind="state.itemProps">
              <TreeTrigger :item-key="item.key" /><TreeTitle
                ><span
                  >{{ splitTreeSearchTitle(String(item.data.title), keyword).before
                  }}<mark
                    v-if="splitTreeSearchTitle(String(item.data.title), keyword).match"
                    class="rounded-sm bg-warning/20 px-0.5 text-inherit"
                    >{{ splitTreeSearchTitle(String(item.data.title), keyword).match }}</mark
                  >{{ splitTreeSearchTitle(String(item.data.title), keyword).after }}</span
                ></TreeTitle
              >
            </div></TreeItem
          ></TreeViewport
        ></TreeRoot
      >
    </div>
  </div>
</template>
