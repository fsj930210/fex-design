<script setup lang="ts">
import { Tree } from '@fex-design/vue/ui/tree'
import { treeDemoData } from './_data/tree-demo'
const treeProps = { treeData: treeDemoData, defaultExpandedKeys: ['root-1', 'root-1-group-1'] }
function toggle(tree: { getFeature<T>(id: string): T | undefined }, key: string | number) {
  tree.getFeature<{ toggle(key: string | number): void }>('expansion')?.toggle(key)
}
</script>
<template>
  <section class="grid w-full gap-space-sm">
    <p class="text-sm text-muted-foreground">
      自定义行内容：名称、唯一 key 和层级；加减按钮展开或收起。
    </p>
    <div class="h-64 overflow-auto">
      <Tree v-bind="treeProps"
        ><template #renderItem="{ item, tree }"
          ><div class="flex min-w-0 items-center gap-2">
            <button
              v-if="!item.isLeaf"
              type="button"
              class="size-5 shrink-0 rounded hover:bg-muted"
              :aria-expanded="tree.getSnapshot().expandedKeys.includes(item.key)"
              :aria-label="'展开或收起 ' + item.data.title"
              @click.stop="toggle(tree, item.key)"
            >
              {{ tree.getSnapshot().expandedKeys.includes(item.key) ? '−' : '+' }}</button
            ><span v-else class="size-5 shrink-0" /><span class="font-medium">{{
              item.data.title
            }}</span
            ><code class="text-xs text-muted-foreground">{{ item.key }}</code
            ><span class="text-xs text-muted-foreground">depth {{ item.depth }}</span>
          </div></template
        ></Tree
      >
    </div>
  </section>
</template>
