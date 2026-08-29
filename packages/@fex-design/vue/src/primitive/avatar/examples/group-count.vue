<script setup lang="ts">import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from '@fex-design/vue/primitive/avatar'</script>
<template><AvatarGroup><Avatar v-for="i in 3" :key="i"><AvatarImage src="https://github.com/shadcn.png" alt="shadcn avatar" /><AvatarFallback>FX</AvatarFallback></Avatar><AvatarGroupCount>+3</AvatarGroupCount></AvatarGroup></template>
