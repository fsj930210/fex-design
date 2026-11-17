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
} from '@fex-design/vue/primitive/dialog'
const open = ref(false)
const innerOpen = ref(false)
</script>
<template>
  <Button @click="open = true">打开外层弹窗</Button
  ><DialogRoot :open="open" @open-change="open = $event"
    ><DialogPortal
      ><DialogOverlay /><DialogContent
        ><DialogHeader><DialogTitle>外层弹窗</DialogTitle></DialogHeader
        ><DialogActions><DialogClose /></DialogActions
        ><DialogBody
          ><p>外层内容会保留。</p>
          <Button @click="innerOpen = true">打开内层弹窗</Button
          ><DialogRoot :open="innerOpen" @open-change="innerOpen = $event"
            ><DialogPortal
              ><DialogOverlay /><DialogContent
                ><DialogHeader><DialogTitle>内层弹窗</DialogTitle></DialogHeader
                ><DialogActions><DialogClose /></DialogActions
                ><DialogBody><p>关闭此弹窗后，外层弹窗仍然保留。</p></DialogBody
                ><DialogFooter
                  ><Button @click="innerOpen = false">关闭内层</Button></DialogFooter
                ></DialogContent
              ></DialogPortal
            ></DialogRoot
          ></DialogBody
        ><DialogFooter><Button @click="open = false">关闭外层</Button></DialogFooter></DialogContent
      ></DialogPortal
    ></DialogRoot
  >
</template>
