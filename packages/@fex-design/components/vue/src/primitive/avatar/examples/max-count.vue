<script setup lang="ts">
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
} from '@fex-design/vue/primitive/avatar'
</script>
<template>
  <AvatarGroup
    ><Avatar v-for="i in 3" :key="i" shape="square"><AvatarFallback>FX</AvatarFallback></Avatar
    ><AvatarGroupCount class="rounded-md">+3</AvatarGroupCount></AvatarGroup
  >
</template>
