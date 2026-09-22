<script setup lang="ts">import { ref } from 'vue'; import { Select } from '@fex-design/vue/ui/select'; const value=ref('react'); const options=[{value:'react',label:'React'},{value:'vue',label:'Vue'},{value:'solid',label:'Solid'}]</script>
<template><Select v-model="value" class="w-72" :options="options" /></template>
