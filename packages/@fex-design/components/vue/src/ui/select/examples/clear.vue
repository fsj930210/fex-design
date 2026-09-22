<script setup lang="ts">import { Select } from '@fex-design/vue/ui/select'; const options=[{value:'react',label:'React'},{value:'vue',label:'Vue'}]</script>
<template><Select class="w-72" :options="options" default-value="react" clearable /></template>
