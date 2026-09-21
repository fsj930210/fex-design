<script setup lang="ts">
import { Avatar, AvatarFallback } from '@fex-design/vue/primitive/avatar'
</script>
<template>
  <div class="flex items-center gap-3">
    <Avatar size="sm"><AvatarFallback>SM</AvatarFallback></Avatar
    ><Avatar size="md"><AvatarFallback>MD</AvatarFallback></Avatar
    ><Avatar size="lg"><AvatarFallback>LG</AvatarFallback></Avatar>
  </div>
</template>
