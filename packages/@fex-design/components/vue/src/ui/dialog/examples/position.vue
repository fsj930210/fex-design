<script setup lang="ts">
import { ref } from 'vue'
import { Dialog } from '@fex-design/vue/ui/dialog'
import { Button } from '@fex-design/vue/ui/button'
const open = ref(false)
</script>
<template>
  <Button @click="open = true">打开 Dialog</Button
  ><Dialog v-model:open="open" title="位置" :class-names="{ content: 'top-[200px] translate-y-0' }"
    ><p>Dialog position 场景。</p></Dialog
  >
</template>
