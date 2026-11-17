<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@fex-design/vue/primitive/button'
import {
  DialogRoot,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogActions,
  DialogClose,
  DialogBody,
  DialogFooter,
} from '@fex-design/vue/primitive/dialog'
const open = ref(false)
const delay = ref(200)
const feedback = ref('尚未操作')
function show(milliseconds: number) {
  delay.value = milliseconds
  open.value = true
  feedback.value = '外部设置 open=true'
}
function onOpenChange(next: boolean) {
  open.value = next
  feedback.value = 'onOpenChange(' + next + ')'
}
function close() {
  open.value = false
  feedback.value = '外部设置 open=false'
}
</script>
<template>
  <div class="flex flex-wrap justify-center gap-2">
    <Button @click="show(0)">打开（0ms）</Button><Button @click="show(200)">打开（200ms）</Button
    ><Button @click="show(1200)">打开（1200ms）</Button>
  </div>
  <p role="status">open：{{ open }}；closeDelay：{{ delay }}ms；最近操作：{{ feedback }}</p>
  <DialogRoot :open="open" @open-change="onOpenChange" :close-delay="delay"
    ><DialogPortal
      ><DialogOverlay /><DialogContent
        :style="{ '--dialog-motion-duration': (open ? 200 : delay) + 'ms' }"
        ><DialogHeader><DialogTitle>关闭延迟</DialogTitle></DialogHeader
        ><DialogActions><DialogClose /></DialogActions
        ><DialogBody
          ><p>点击右上角关闭，或通过按钮设置 open=false，对比关闭过渡。</p>
          <p>open 会立即变为 false，{{ delay }}ms 后结束关闭阶段。</p></DialogBody
        ><DialogFooter><Button @click="close">设置 open=false</Button></DialogFooter></DialogContent
      ></DialogPortal
    ></DialogRoot
  >
</template>
