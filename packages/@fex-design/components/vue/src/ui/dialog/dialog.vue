<script setup lang="ts">
import { type StyleValue, type ButtonHTMLAttributes, type Component } from 'vue'
import { Button } from '../button'
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
} from '../../primitive/dialog'

const props = withDefaults(
  defineProps<{
    open?: boolean
    modal?: boolean
    defaultOpen?: boolean
    forceMount?: boolean
    closeDelay?: number
    closeOnEscape?: boolean
    title?: string
    closable?:
      | boolean
      | { icon?: Component | null; disabled?: boolean; onClose?: (event: MouseEvent) => void }
    closeOnOverlayClick?: boolean
    overlay?: boolean
    fullscreen?: boolean | { mode?: 'viewport' | 'screen' }
    footer?: unknown
    okBtnProps?: ButtonHTMLAttributes & { content?: string; color?: 'primary'; variant?: 'solid' }
    cancelBtnProps?: ButtonHTMLAttributes & { content?: string }
    classNames?: Record<string, string>
    styles?: Record<string, StyleValue>
  }>(),
  {
    closable: true,
    overlay: true,
    modal: true,
    closeOnEscape: true,
    closeOnOverlayClick: true,
    closeDelay: 200,
    defaultOpen: false,
    forceMount: false,
  },
)
const emit = defineEmits<{
  openChange: [open: boolean, info: unknown]
  'update:open': [open: boolean]
}>()
function handleOpenChange(open: boolean, info: unknown) {
  emit('openChange', open, info)
  emit('update:open', open)
}
</script>

<template>
  <DialogRoot
    :modal="props.modal"
    :open="props.open"
    :default-open="props.defaultOpen"
    :fullscreen="props.fullscreen"
    :force-mount="props.forceMount"
    :close-delay="props.closeDelay"
    :close-on-escape="props.closeOnEscape"
    :close-on-overlay-click="props.closeOnOverlayClick"
    @open-change="handleOpenChange"
  >
    <slot name="trigger" />
    <DialogPortal>
      <DialogOverlay
        v-if="props.overlay !== false"
        :class="props.classNames?.overlay"
        :style="props.styles?.overlay"
      />
      <DialogContent :class="props.classNames?.content" :style="props.styles?.content">
        <DialogHeader :class="props.classNames?.header" :style="props.styles?.header">
          <DialogTitle :class="props.classNames?.title" :style="props.styles?.title"
            ><slot name="title">{{ title }}</slot></DialogTitle
          >
          <slot name="header" />
        </DialogHeader>
        <DialogActions>
          <slot name="actions" />
          <DialogFullscreenToggle v-if="fullscreen" />
          <template
            v-if="closable !== false && !(typeof closable === 'object' && closable.icon === null)"
          >
            <DialogClose
              v-if="typeof closable === 'object' && closable.icon"
              :disabled="closable.disabled"
              :class="props.classNames?.close"
              :style="props.styles?.close"
              @click="closable.onClose?.($event)"
              ><template #icon><component :is="closable.icon" /></template
            ></DialogClose>
            <DialogClose
              v-else
              :disabled="typeof closable === 'object' ? closable.disabled : undefined"
              :class="props.classNames?.close"
              :style="props.styles?.close"
              @click="typeof closable === 'object' && closable.onClose?.($event)"
            />
          </template>
        </DialogActions>
        <DialogBody :class="props.classNames?.body" :style="props.styles?.body"
          ><slot
        /></DialogBody>
        <DialogFooter
          v-if="$slots.footer || footer !== null"
          :class="props.classNames?.footer"
          :style="props.styles?.footer"
        >
          <slot name="footer"
            ><DialogClose
              ><template #button="{ props: closeProps }"
                ><Button
                  v-bind="{ ...closeProps, ...cancelBtnProps }"
                  @click="closeProps.onClick($event)"
                  >{{ cancelBtnProps?.content ?? '取消' }}</Button
                ></template
              ></DialogClose
            ><Button variant="solid" color="primary" v-bind="okBtnProps">{{
              okBtnProps?.content ?? '确定'
            }}</Button></slot
          >
        </DialogFooter>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
