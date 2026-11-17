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
  <Button @click="open = true">打开确认弹窗</Button>
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
        ><DialogHeader class="border-0"
          ><DialogTitle><span class="text-danger">确认删除</span></DialogTitle></DialogHeader
        ><DialogActions><DialogClose /></DialogActions
        ><DialogBody
          ><p>删除后无法恢复，<strong>请确认是否继续。</strong></p></DialogBody
        ><DialogFooter class="border-0"
          ><DialogClose>取消</DialogClose
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
