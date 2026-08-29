<script setup lang="ts">import { Avatar, AvatarGroup } from '@fex-design/vue/ui/avatar'</script>
<template><AvatarGroup><Avatar v-for="i in 3" :key="i" src="https://github.com/shadcn.png" fallback="FX" /></AvatarGroup></template>
