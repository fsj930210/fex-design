<script setup lang="ts">import { SelectContent,SelectRoot,SelectTrigger } from '@fex-design/vue/primitive/select'; const items=[{value:'react',label:'React'},{value:'vue',label:'Vue'}]</script>
<template><SelectRoot :items="items" default-value="react"><SelectTrigger class="w-72" placeholder="请选择框架"/><SelectContent/></SelectRoot></template>

