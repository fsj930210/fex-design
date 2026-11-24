<script setup lang="ts">
import { ref } from 'vue'
import { Dropdown } from '@fex-design/vue/ui/dropdown'
import { Button } from '@fex-design/vue/ui/button'
const open = ref(false)
const uncontrolledOpen = ref(false)
const items = [
  { value: 'rename', label: '重命名' },
  { value: 'duplicate', label: '复制' },
]
</script>
<template>
  <div class="flex min-h-48 flex-col items-start gap-4 p-6">
    <Button @click="open = !open">外部切换</Button
    ><Dropdown :items="items" v-model:open="open">受控菜单</Dropdown
    ><output>菜单状态：{{ open ? '打开' : '关闭' }}</output
    ><Dropdown :items="items" @open-change="(value) => (uncontrolledOpen = value)"
      >非受控菜单</Dropdown
    ><output>非受控菜单状态：{{ uncontrolledOpen ? '打开' : '关闭' }}</output>
  </div>
</template>
