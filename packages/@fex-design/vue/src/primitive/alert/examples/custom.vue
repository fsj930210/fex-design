<script setup lang="ts">
import { ref } from 'vue'
import { Alert, AlertAction, AlertIcon, AlertTitle } from '@fex-design/vue/primitive/alert'
import { StarIcon } from '@fex-design/vue/icon/star'
import { CloseIcon } from '@fex-design/vue/icon/close'
import { alertCloseClassName } from '@fex-design/styles/alert'
const visible = ref(true)
</script>
<template><div v-if="visible" class="w-full max-w-sm"><Alert type="success"><AlertIcon><StarIcon /></AlertIcon><AlertTitle>Long alert title wraps to multiple lines when the alert container is narrow enough.</AlertTitle><AlertAction><button class="underline">Action</button></AlertAction><button :class="alertCloseClassName" data-slot="alert-close" aria-label="关闭提示" @click="visible=false"><CloseIcon /></button></Alert></div></template>
