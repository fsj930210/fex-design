<script setup lang="ts">
import { ref } from 'vue'
import { Dialog } from '@fex-design/vue/ui/dialog'
import { Button } from '@fex-design/vue/ui/button'
const open = ref(false)
</script>
<template>
  <Button @click="open = true">打开 Dialog</Button
  ><Dialog v-model:open="open" title="基础 Dialog">这是 Dialog 内容。</Dialog>
</template>
