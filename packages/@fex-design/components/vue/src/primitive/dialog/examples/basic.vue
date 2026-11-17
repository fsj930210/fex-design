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
</script>
<template>
  <Button @click="open = true">打开 Dialog</Button
  ><DialogRoot :open="open" @open-change="open = $event"
    ><DialogPortal
      ><DialogOverlay /><DialogContent
        ><DialogHeader><DialogTitle>基础 Dialog</DialogTitle></DialogHeader
        ><DialogActions><DialogClose /></DialogActions><DialogBody>这是 Dialog 内容。</DialogBody
        ><DialogFooter
          ><DialogClose>取消</DialogClose
          ><Button variant="solid" color="primary">确定</Button></DialogFooter
        ></DialogContent
      ></DialogPortal
    ></DialogRoot
  >
</template>
