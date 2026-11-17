<script setup lang="ts">
import { dialogMessageClassName } from '@fex-design/components-styles/dialog'
import type { DialogStaticButtonProps, DialogStaticContent } from './static'
import { shallowRef, onBeforeUnmount, type FunctionalComponent } from 'vue'
import type { createDialogRequest } from '@fex-design/core/dialog/create-dialog-controller'
import Dialog from './dialog.vue'
import { Button } from '../button'
const { request } = defineProps<{
  request: ReturnType<typeof createDialogRequest<DialogStaticContent, DialogStaticButtonProps>>
}>()
const RenderContent: FunctionalComponent<{ value: DialogStaticContent }> = ({ value }) =>
  typeof value === 'function' ? value() : value
const state = shallowRef(request.getSnapshot())
const unsubscribe = request.subscribe(() => {
  state.value = request.getSnapshot()
})
onBeforeUnmount(unsubscribe)
</script>
<template>
  <Dialog
    :open="state.open"
    :closable="(state.options.closable ?? request.kind === 'confirm') && !state.pending"
    :close-on-escape="false"
    :close-on-overlay-click="false"
    :class-names="{ content: dialogMessageClassName }"
    @open-change="
      (open) => {
        if (!open) request.cancel()
      }
    "
  >
    <template #title
      ><RenderContent
        :value="state.options.title ?? (request.kind === 'alert' ? '提示' : '确认操作')"
    /></template>
    <RenderContent :value="state.options.content" />
    <p role="alert" class="text-danger">{{ state.error }}</p>
    <template #footer
      ><Button
        v-if="request.kind === 'confirm'"
        v-bind="state.options.cancelBtnProps"
        type="button"
        :disabled="state.pending || state.options.cancelBtnProps?.disabled"
        @click="request.cancel()"
        >{{ state.options.cancelBtnProps?.content ?? '取消' }}</Button
      ><Button
        variant="solid"
        color="primary"
        v-bind="state.options.okBtnProps"
        type="button"
        :disabled="state.pending || state.options.okBtnProps?.disabled"
        :loading="state.pending || state.options.okBtnProps?.loading"
        @click="request.confirm()"
        >{{ state.options.okBtnProps?.content ?? '确定' }}</Button
      ></template
    >
  </Dialog>
</template>
