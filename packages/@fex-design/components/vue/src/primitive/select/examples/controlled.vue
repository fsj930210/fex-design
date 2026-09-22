<script setup lang="ts">
import { ref } from 'vue'
import { SelectContent, SelectRoot, SelectTrigger } from '@fex-design/vue/primitive/select'
const options = [{ value: 'react', label: 'React' }, { value: 'vue', label: 'Vue' }]
const value = ref('react')
const open = ref(false)
</script>
<template><div class="flex flex-wrap gap-4"><div class="space-y-2"><div class="flex flex-wrap gap-2"><button class="cursor-pointer rounded-md border border-border bg-background px-3 py-1.5 text-sm hover:bg-muted" type="button" @click="value = 'react'">设置 React</button><button class="cursor-pointer rounded-md border border-border bg-background px-3 py-1.5 text-sm hover:bg-muted" type="button" @click="value = 'vue'">设置 Vue</button><button class="cursor-pointer rounded-md border border-border bg-background px-3 py-1.5 text-sm hover:bg-muted" type="button" @click="open = true">打开面板</button><button class="cursor-pointer rounded-md border border-border bg-background px-3 py-1.5 text-sm hover:bg-muted" type="button" @click="open = false">关闭面板</button></div><p class="text-sm text-muted-foreground">当前受控值：{{ value }}；面板：{{ open ? '打开' : '关闭' }}</p><SelectRoot v-model="value" :options="options" :open="open" @open-change="open = $event"><SelectTrigger class="w-60"/><SelectContent/></SelectRoot></div><div class="space-y-2"><span>非受控 value / open</span><SelectRoot :options="options" default-value="vue" default-open><SelectTrigger class="w-60"/><SelectContent/></SelectRoot></div></div></template>
