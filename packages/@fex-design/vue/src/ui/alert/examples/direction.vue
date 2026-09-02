<script setup lang="ts">
import { Alert } from '@fex-design/vue/ui/alert'
const items = [{ dir: 'ltr', title: '配置需要确认', action: '查看' }, { dir: 'rtl', title: 'يجب تأكيد الإعداد', action: 'عرض' }] as const
</script>
<template><div class="grid w-full gap-6 sm:grid-cols-2"><section v-for="item in items" :key="item.dir" :dir="item.dir" class="grid gap-3 rounded-lg border p-4"><strong>{{ item.dir.toUpperCase() }}</strong><Alert type="warning" show-icon closable :title="item.title"><template #action><button class="underline">{{ item.action }}</button></template></Alert></section></div></template>
