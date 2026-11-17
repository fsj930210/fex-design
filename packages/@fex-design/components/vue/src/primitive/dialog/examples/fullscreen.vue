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
const mode = ref<'viewport' | 'screen'>('viewport')
</script>
<template>
  <Button @click="mode = mode === 'viewport' ? 'screen' : 'viewport'"
    >切换为 {{ mode === 'viewport' ? '浏览器全屏' : '视口全屏' }}</Button
  ><Button @click="open = true">打开 Dialog</Button
  ><DialogRoot :open="open" @open-change="open = $event" :fullscreen="{ mode: mode }"
    ><DialogPortal
      ><DialogOverlay /><DialogContent
        ><DialogHeader><DialogTitle>全屏</DialogTitle></DialogHeader
        ><DialogActions><DialogFullscreenToggle /><DialogClose /></DialogActions
        ><DialogBody>全屏内容。</DialogBody
        ><DialogFooter
          ><DialogClose>取消</DialogClose
          ><Button variant="solid" color="primary">确定</Button></DialogFooter
        ></DialogContent
      ></DialogPortal
    ></DialogRoot
  >
</template>
