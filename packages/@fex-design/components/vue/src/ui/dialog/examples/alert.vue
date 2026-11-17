<script setup lang="ts">
import { ref } from 'vue'
import { Dialog } from '@fex-design/vue/ui/dialog'
import { Button } from '@fex-design/vue/ui/button'
const result = ref('尚未操作')
async function show() {
  const handle = Dialog.alert({ title: '操作成功', content: '资料已经保存，可以继续操作。' })
  result.value = (await handle.result) ? '已确认' : '已取消'
}
</script>
<template>
  <Button @click="show">打开提示弹窗</Button>
  <p role="status">{{ result }}</p>
</template>
