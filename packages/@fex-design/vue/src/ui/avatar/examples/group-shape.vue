<script setup lang="ts">
import { Avatar, AvatarGroup } from '@fex-design/vue/ui/avatar'
</script>
<template>
  <AvatarGroup><Avatar v-for="i in 3" :key="i" shape="square" fallback="FX" /></AvatarGroup>
</template>
