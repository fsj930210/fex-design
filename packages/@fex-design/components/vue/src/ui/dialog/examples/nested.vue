<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@fex-design/vue/ui/button'
import { Dialog } from '@fex-design/vue/ui/dialog'
const open = ref(false)
const innerOpen = ref(false)
</script>
<template>
  <Button @click="open = true">打开外层弹窗</Button
  ><Dialog v-model:open="open" title="外层弹窗"
    ><p>外层内容会保留。</p>
    <Button @click="innerOpen = true">打开内层弹窗</Button
    ><Dialog v-model:open="innerOpen" title="内层弹窗"
      ><p>关闭此弹窗后，外层弹窗仍然保留。</p>
      <template #footer><Button @click="innerOpen = false">关闭内层</Button></template></Dialog
    ><template #footer><Button @click="open = false">关闭外层</Button></template></Dialog
  >
</template>
