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
        ><DialogHeader
          ><DialogTitle>自定义标题</DialogTitle>
          <div class="text-sm text-muted-foreground">这是自定义 Header 内容</div></DialogHeader
        ><DialogActions><DialogClose /></DialogActions
        ><DialogBody>Dialog custom-header 场景。</DialogBody
        ><DialogFooter
          ><DialogClose>取消</DialogClose
          ><Button variant="solid" color="primary">确定</Button></DialogFooter
        ></DialogContent
      ></DialogPortal
    ></DialogRoot
  >
</template>
