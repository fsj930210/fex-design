<script setup lang="ts">
import { ref } from 'vue'
import { Dialog } from '@fex-design/vue/ui/dialog'
import { Button } from '@fex-design/vue/ui/button'
const open = ref(false)
const direction = ref<'ltr' | 'rtl'>('ltr')
</script>
<template>
  <Button
    @click="
      direction = 'ltr'
      open = true
    "
    >打开 LTR</Button
  ><Button
    @click="
      direction = 'rtl'
      open = true
    "
    >打开 RTL</Button
  ><Dialog
    v-model:open="open"
    title="书写方向"
    :class-names="{ content: direction === 'rtl' ? '[direction:rtl]' : '[direction:ltr]' }"
    ><p>English: read from left to right. العربية: تُقرأ من اليمين إلى اليسار.</p></Dialog
  >
</template>
