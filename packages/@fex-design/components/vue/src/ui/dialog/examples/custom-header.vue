<script setup lang="ts">
import { ref } from 'vue'
import { Dialog } from '@fex-design/vue/ui/dialog'
import { Button } from '@fex-design/vue/ui/button'
const open = ref(false)
</script>
<template>
  <Button @click="open = true">打开 Dialog</Button
  ><Dialog v-model:open="open" title="自定义标题"
    ><template #header
      ><span class="text-sm text-muted-foreground">这是自定义 Header 内容</span></template
    >
    <p>Dialog custom-header 场景。</p></Dialog
  >
</template>
