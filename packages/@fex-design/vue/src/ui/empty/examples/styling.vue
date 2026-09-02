<script setup lang="ts">import { Empty } from '@fex-design/vue/ui/empty'</script>
<template><Empty title="暂无通知" description="新的通知会显示在这里。" :class-names="{ root: 'min-h-72 bg-secondary-background', image: 'text-primary', title: 'text-base', content: 'mt-2' }" :styles="{ description: { maxWidth: '24rem' } }"><button class="rounded-md border border-border px-3 py-2">刷新</button></Empty></template>
