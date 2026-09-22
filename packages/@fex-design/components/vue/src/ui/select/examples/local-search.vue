<script setup lang="ts">import { Select } from '@fex-design/vue/ui/select'; const options=[{value:'beijing',label:'北京'},{value:'shanghai',label:'上海'},{value:'shenzhen',label:'深圳'}]; const filter=(keyword:string,option:{label:string})=>option.label.includes(keyword)</script>
<template><Select class="w-72" :options="options" searchable :filter-option="filter" placeholder="搜索城市" /></template>
