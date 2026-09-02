<script setup lang="ts">
import { ref } from 'vue'
import { Alert, AlertDescription, AlertIcon, AlertTitle } from '@fex-design/vue/primitive/alert'
import { CircleWarningIcon } from '@fex-design/vue/icon/circle-warning'
import { CloseIcon } from '@fex-design/vue/icon/close'
import { alertCloseClassName } from '@fex-design/styles/alert'
const visible = ref(true)
</script>

<template>
  <div class="grid w-full gap-3">
    <Alert v-if="visible" type="warning"><AlertIcon><CircleWarningIcon /></AlertIcon><AlertTitle>这条提示可以关闭</AlertTitle><button :class="alertCloseClassName" data-slot="alert-close" aria-label="关闭提示" @click="visible=false"><CloseIcon /></button></Alert>
    <button v-else @click="visible=true">重新显示</button>
    <Alert><AlertTitle>阻止默认关闭</AlertTitle><AlertDescription>关闭事件被阻止后保持显示。</AlertDescription><button :class="alertCloseClassName" data-slot="alert-close" aria-label="关闭提示" @click.prevent><CloseIcon /></button></Alert>
  </div>
</template>
