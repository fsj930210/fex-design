<script setup lang="ts">
import { ref } from 'vue'
import { Dropdown } from '@fex-design/vue/ui/dropdown'
const selected = ref('尚未选择')
const items = [
  { value: 'edit', label: '编辑资料', textValue: '编辑' },
  { value: 'archive', label: '归档项目', textValue: '归档' },
]
</script>
<template>
  <div class="flex min-h-48 flex-col items-start gap-4 p-6">
    <Dropdown :items="items" @activate="(info) => (selected = info.value)"
      ><template #item="binding"
        ><button
          v-bind="binding.props"
          :ref="binding.ref"
          class="flex h-[var(--menu-item-height)] items-center justify-between gap-6 px-[var(--menu-item-padding-x)] text-sm"
        >
          <span>{{ binding.item.label }}</span
          ><kbd>{{ binding.item.value === 'edit' ? '⌘ E' : '⌘ A' }}</kbd>
        </button></template
      >选择操作</Dropdown
    ><output>最近操作：{{ selected }}</output>
  </div>
</template>
