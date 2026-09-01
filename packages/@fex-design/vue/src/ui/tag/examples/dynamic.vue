<script setup lang="ts">
import { ref } from 'vue'
import { Tag } from '@fex-design/vue/ui/tag'
const tags = ref([{ id: 1, label: '设计' }, { id: 2, label: '开发' }, { id: 3, label: '测试' }])
const name = ref('')
function addTag() { const label = name.value.trim(); if (!label) return; tags.value.push({ id: Date.now(), label }); name.value = '' }
function removeTag(id: number) { tags.value = tags.value.filter((tag) => tag.id !== id) }
</script>
<template><div class="grid gap-3"><div class="flex flex-wrap gap-2"><Tag v-for="tag in tags" :key="tag.id" color="primary" closable @close="removeTag(tag.id)">{{ tag.label }}</Tag></div><div class="flex gap-2"><input v-model="name" class="h-8 rounded-md border px-2 text-sm" placeholder="输入标签名称" /><button type="button" class="h-8 rounded-md bg-primary px-3 text-sm text-primary-foreground" @click="addTag">添加标签</button></div></div></template>
