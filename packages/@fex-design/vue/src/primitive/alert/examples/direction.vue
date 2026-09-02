<script setup lang="ts">
import { Alert, AlertAction, AlertIcon, AlertTitle } from '@fex-design/vue/primitive/alert'
import { CircleWarningIcon } from '@fex-design/vue/icon/circle-warning'
import { CloseIcon } from '@fex-design/vue/icon/close'
import { alertCloseClassName } from '@fex-design/styles/alert'
const items = [{ dir: 'ltr', title: '配置需要确认', action: '查看' }, { dir: 'rtl', title: 'يجب تأكيد الإعداد', action: 'عرض' }] as const
</script>
<template><div class="grid w-full gap-6 sm:grid-cols-2"><section v-for="item in items" :key="item.dir" :dir="item.dir" class="grid gap-3 rounded-lg border p-4"><strong>{{ item.dir.toUpperCase() }}</strong><Alert type="warning"><AlertIcon><CircleWarningIcon /></AlertIcon><AlertTitle>{{ item.title }}</AlertTitle><AlertAction><button class="underline">{{ item.action }}</button></AlertAction><button :class="alertCloseClassName" data-slot="alert-close" aria-label="关闭提示"><CloseIcon /></button></Alert></section></div></template>
