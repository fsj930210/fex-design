<script setup lang="ts">import { Avatar, AvatarFallback, AvatarGroup } from '@fex-design/vue/primitive/avatar'</script>
<template><AvatarGroup><Avatar v-for="i in 3" :key="i" shape="square"><AvatarFallback>FX</AvatarFallback></Avatar></AvatarGroup></template>
