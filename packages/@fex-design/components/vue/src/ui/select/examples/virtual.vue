<script setup lang="ts">import { Select } from '@fex-design/vue/ui/select'; const items=Array.from({length:1000},(_,index)=>({value:index,label:`项目 ${index+1}`}))</script>
<template><Select class="w-72" :items="items" searchable :virtual="{itemHeight:32,overscan:4}" placeholder="搜索 1000 个项目" /></template>

