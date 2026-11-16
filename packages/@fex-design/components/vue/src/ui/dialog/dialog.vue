<script setup lang="ts">
import { type StyleValue } from 'vue'
import { Button } from '../../primitive/button'
import { DialogRoot, DialogPortal, DialogOverlay, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogFooter, DialogClose, DialogFullscreenToggle } from '../../primitive/dialog'

const props = withDefaults(defineProps<{
  open?: boolean
  defaultOpen?: boolean
  title?: string
  closable?: boolean
  fullscreen?: boolean | { mode?: 'viewport' | 'screen' }
  footer?: unknown
  okText?: string
  cancelText?: string
  classNames?: Record<string, string>
  styles?: Record<string, StyleValue>
}>(), { closable: true, okText: '确定', cancelText: '取消' })
const emit = defineEmits<{ openChange: [open: boolean, info: unknown]; 'update:open': [open: boolean] }>()
function handleOpenChange(open: boolean, info: unknown) {
  emit('openChange', open, info)
  emit('update:open', open)
}
</script>

<template>
  <DialogRoot :open="props.open" :default-open="props.defaultOpen" :fullscreen="props.fullscreen" @open-change="handleOpenChange">
    <slot name="trigger" />
    <DialogPortal>
      <DialogOverlay :class="props.classNames?.overlay" :style="props.styles?.overlay" />
      <DialogContent :class="props.classNames?.content" :style="props.styles?.content">
        <DialogHeader :class="props.classNames?.header" :style="props.styles?.header">
          <DialogTitle :class="props.classNames?.title" :style="props.styles?.title">{{ title }}</DialogTitle>
          <slot name="header" />
          <DialogFullscreenToggle v-if="fullscreen" />
          <DialogClose v-if="closable" :class="props.classNames?.close" :style="props.styles?.close" />
        </DialogHeader>
        <DialogBody :class="props.classNames?.body" :style="props.styles?.body"><slot /></DialogBody>
        <DialogFooter v-if="$slots.footer || footer !== null" :class="props.classNames?.footer" :style="props.styles?.footer">
          <slot name="footer"><DialogClose>{{ cancelText }}</DialogClose><Button variant="solid" color="primary">{{ okText }}</Button></slot>
        </DialogFooter>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
