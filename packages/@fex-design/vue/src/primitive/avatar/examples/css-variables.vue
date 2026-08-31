<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from '@fex-design/vue/primitive/avatar'
</script>
<template>
  <AvatarGroup class="[--avatar-size:3rem] [--avatar-group-overlap:1rem]"
    ><Avatar
      ><AvatarImage src="https://github.com/shadcn.png" alt="shadcn avatar" /><AvatarFallback
        >FX</AvatarFallback
      ></Avatar
    ><Avatar><AvatarFallback>AB</AvatarFallback></Avatar
    ><Avatar><AvatarFallback>CD</AvatarFallback></Avatar></AvatarGroup
  >
</template>
