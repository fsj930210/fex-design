<script setup lang="ts">import { Select } from '@fex-design/vue/ui/select'; const options=[{value:'frontend',label:'前端框架',options:[{value:'react',label:'React'},{value:'vue',label:'Vue'}]},{value:'backend',label:'后端框架',options:[{value:'nest',label:'NestJS'},{value:'spring',label:'Spring'}]}]</script>
<template><Select class="w-72" :options="options" placeholder="请选择框架" /></template>
