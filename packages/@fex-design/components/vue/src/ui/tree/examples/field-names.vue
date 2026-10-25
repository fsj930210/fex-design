<script setup lang="ts">
import { ref } from 'vue'
import { Tree } from '@fex-design/vue/ui/tree'
import { organizationTreeData } from './_data/tree-demo'
const fieldNames = { key: 'id', title: 'name', isLeaf: 'leaf', disabled: 'unavailable' }
const selected = ref<readonly (string | number)[]>([])
const change = (keys: readonly (string | number)[]) => {
  selected.value = keys
}
</script>
<template>
  <section class="grid w-full gap-space-sm">
    <p class="text-xs text-muted-foreground">
      id → key；name → title；leaf → isLeaf；unavailable → disabled。
    </p>
    <div class="max-h-64 overflow-y-auto">
      <Tree
        :tree-data="organizationTreeData"
        :field-names="fieldNames"
        :default-expanded-keys="['engineering', 'frontend']"
        @select="change"
      />
    </div>
    <output class="min-h-5 break-all text-xs text-muted-foreground" aria-live="polite"
      >已选 ID：{{ selected.join(', ') || '无' }}</output
    >
  </section>
</template>
