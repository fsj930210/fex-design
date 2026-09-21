<script setup lang="ts">import { Select } from '@fex-design/vue/ui/select'; const items=[{value:'react',label:'React'},{value:'vue',label:'Vue'}]</script>
<template><Select class="w-72" :items="items" default-value="react" placeholder="请选择框架" clearable /></template>

