<script setup lang="ts">
import { dialogMessageClassName } from '@fex-design/components-styles/dialog'

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
const result = ref('尚未操作')
</script>
<template>
  <Button @click="open = true">打开提示弹窗</Button>
  <p role="status">{{ result }}</p>
  <DialogRoot
    :close-on-escape="false"
    :close-on-overlay-click="false"
    :open="open"
    @open-change="
      open = $event;
      if (!$event) result = '已取消'
    "
    ><DialogPortal
      ><DialogOverlay /><DialogContent :class="dialogMessageClassName"
        ><DialogHeader class="border-0"><DialogTitle>操作成功</DialogTitle></DialogHeader
        ><DialogBody>资料已经保存，可以继续操作。</DialogBody
        ><DialogFooter class="border-0"
          ><Button
            variant="solid"
            color="primary"
            @click="
              result = '已确认';
              open = false
            "
            >确定</Button
          ></DialogFooter
        ></DialogContent
      ></DialogPortal
    ></DialogRoot
  >
</template>
