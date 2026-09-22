<script setup lang="ts">
import { ref } from 'vue'
import { Select } from '@fex-design/vue/ui/select'
const options = [{ value: 'react', label: 'React' }, { value: 'vue', label: 'Vue' }]
const value = ref('react')
const open = ref(false)
</script>
<template><div class="flex flex-wrap gap-4"><div class="space-y-2"><div class="flex flex-wrap gap-2"><button class="cursor-pointer rounded-md border border-border bg-background px-3 py-1.5 text-sm hover:bg-muted" type="button" @click="value = 'react'">设置 React</button><button class="cursor-pointer rounded-md border border-border bg-background px-3 py-1.5 text-sm hover:bg-muted" type="button" @click="value = 'vue'">设置 Vue</button><button class="cursor-pointer rounded-md border border-border bg-background px-3 py-1.5 text-sm hover:bg-muted" type="button" @click="open = true">打开面板</button><button class="cursor-pointer rounded-md border border-border bg-background px-3 py-1.5 text-sm hover:bg-muted" type="button" @click="open = false">关闭面板</button></div><p class="text-sm text-muted-foreground">当前受控值：{{ value }}；面板：{{ open ? '打开' : '关闭' }}</p><Select v-model="value" class="w-60" :options="options" :popover-props="{ open, onOpenChange: (next) => open = next }" /></div><div class="space-y-2"><span>非受控 value / open</span><Select class="w-60" :options="options" default-value="vue" :popover-props="{ defaultOpen: true }" /></div></div></template>
