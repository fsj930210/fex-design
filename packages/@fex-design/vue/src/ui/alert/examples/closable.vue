<script setup lang="ts">
import { Alert } from '@fex-design/vue/ui/alert'
</script>

<template><div class="grid w-full gap-3"><Alert type="warning" show-icon closable title="这条提示可以关闭" /><Alert closable title="阻止默认关闭" description="关闭事件被阻止后保持显示。" @close="$event.preventDefault()" /></div></template>
