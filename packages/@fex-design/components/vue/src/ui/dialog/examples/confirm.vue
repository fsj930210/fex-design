<script setup lang="ts">
import { h, ref } from 'vue'
import { Dialog } from '@fex-design/vue/ui/dialog'
import { Button } from '@fex-design/vue/ui/button'
const result = ref('尚未操作')
async function show() {
  const handle = Dialog.confirm({
    title: () => h('span', { class: 'text-danger' }, '确认删除'),
    content: () => h('p', null, ['删除后无法恢复，', h('strong', '请确认是否继续。')]),
  })
  result.value = (await handle.result) ? '已确认' : '已取消'
}
</script>
<template>
  <Button @click="show">打开确认弹窗</Button>
  <p role="status">{{ result }}</p>
</template>
