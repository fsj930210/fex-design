<script setup lang="ts">
import { usePopover } from '@fex-design/vue/primitive/popover'
import { Button } from '@fex-design/vue/ui/button'

const popover = usePopover(() => ({}))
</script>

<template>
  <div class="flex items-center gap-3">
    <Button @click="popover.overlay.toggle()">{{ popover.snapshot.open ? '关闭' : '打开' }}</Button>
    <output>状态：{{ popover.snapshot.open ? '已打开' : '已关闭' }}</output>
  </div>
</template>
