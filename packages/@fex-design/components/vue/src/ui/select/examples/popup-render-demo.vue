<script setup lang="ts">import { Select } from '@fex-design/vue/ui/select'; const options=[{value:'react',label:'React'},{value:'vue',label:'Vue'}]</script>
<template><Select class="w-72" :options="options"><template #popup="{ menu }"><div><component :is="menu" /><div class="border-t border-border px-3 py-2 text-xs text-muted-foreground">选择常用框架</div></div></template></Select></template>
