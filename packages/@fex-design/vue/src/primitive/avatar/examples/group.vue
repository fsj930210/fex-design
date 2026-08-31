<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from '@fex-design/vue/primitive/avatar'
</script>
<template>
  <AvatarGroup
    ><Avatar v-for="i in 3" :key="i"
      ><AvatarImage src="https://github.com/shadcn.png" alt="shadcn avatar" /><AvatarFallback
        >FX</AvatarFallback
      ></Avatar
    ></AvatarGroup
  >
</template>
