<script setup lang="ts">import { Select } from '@fex-design/vue/ui/select'; const users=[{profileId:1,displayName:'张三'},{profileId:2,displayName:'李四',disabled:true}]</script>
<template><Select class="w-72" :items="users" :field-names="{value:'profileId',label:'displayName'}" placeholder="请选择用户" /></template>

