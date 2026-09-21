<script setup lang="ts">
import { Avatar, AvatarFallback } from '@fex-design/vue/primitive/avatar'
</script>
<template>
  <div class="flex items-center gap-3">
    <Avatar shape="circle"><AvatarFallback>CI</AvatarFallback></Avatar
    ><Avatar shape="square"><AvatarFallback>SQ</AvatarFallback></Avatar>
  </div>
</template>
