<script setup lang="ts">import { Select } from '@fex-design/vue/ui/select'; const options=[{value:'react',label:'React'},{value:'vue',label:'Vue'},{value:'solid',label:'Solid'}]</script>
<template><Select class="w-72" :options="options" multiple :default-value="['react','vue']" :max-tag-count="2" /></template>
