<script setup lang="ts">
import { ref } from 'vue'
import { Dialog } from '@fex-design/vue/ui/dialog'
import { Button } from '@fex-design/vue/ui/button'
const open = ref(false)
const mode = ref<'viewport' | 'screen'>('viewport')
</script>
<template><Button @click="mode = mode === 'viewport' ? 'screen' : 'viewport'">切换为 {{ mode === 'viewport' ? '浏览器全屏' : '视口全屏' }}</Button><Button @click="open = true">打开 Dialog</Button><Dialog v-model:open="open" :fullscreen="{ mode }" title="全屏">全屏内容。</Dialog></template>
