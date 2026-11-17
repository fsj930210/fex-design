<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@fex-design/vue/primitive/button'
import {
  DialogRoot,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogActions,
  DialogTitle,
  DialogBody,
  DialogFooter,
  DialogClose,
  DialogFullscreenToggle,
} from '@fex-design/vue/primitive/dialog'
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
  ><DialogRoot :open="open" @open-change="open = $event"
    ><DialogPortal
      ><DialogOverlay /><DialogContent
        :class="direction === 'rtl' ? '[direction:rtl]' : '[direction:ltr]'"
        ><DialogHeader><DialogTitle>方向</DialogTitle></DialogHeader
        ><DialogActions><DialogClose /></DialogActions
        ><DialogBody
          >English: read from left to right. العربية: تُقرأ من اليمين إلى اليسار.</DialogBody
        ><DialogFooter
          ><DialogClose>取消</DialogClose
          ><Button variant="solid" color="primary">确定</Button></DialogFooter
        ></DialogContent
      ></DialogPortal
    ></DialogRoot
  >
</template>
