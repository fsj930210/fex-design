<script setup lang="ts">
import { ref } from 'vue'
import { Tooltip } from '@fex-design/vue/ui/tooltip'
import { Button } from '@fex-design/vue/ui/button'
const open = ref(false)
</script>
<template>
  <div class="flex min-h-64 items-center justify-center gap-3">
    <Button @click="open = !open">外部{{ open ? '关闭' : '打开' }}</Button
    ><Tooltip v-model:open="open" title="状态由调用方管理"
      ><Button variant="outlined">受控提示</Button></Tooltip
    >
  </div>
</template>
