<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@fex-design/vue/primitive/button'
import { DialogRoot, DialogPortal, DialogOverlay, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogFooter, DialogClose, DialogFullscreenToggle } from '@fex-design/vue/primitive/dialog'
const open=ref(false)
</script>
<template><Button @click="open=true">打开 Dialog</Button><DialogRoot :open="open" @open-change="open=$event"><DialogPortal><DialogOverlay/><DialogContent><DialogHeader><DialogTitle>自定义 Footer</DialogTitle><DialogClose/></DialogHeader><DialogBody>Dialog custom-footer 场景。</DialogBody><DialogFooter><DialogClose>取消</DialogClose><Button>保存草稿</Button><Button variant="solid" color="primary">确定</Button></DialogFooter></DialogContent></DialogPortal></DialogRoot></template>

