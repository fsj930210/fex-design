<script setup lang="ts">
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from '@fex-design/vue/primitive/avatar'
</script>
<template>
  <Avatar
    ><AvatarImage src="https://github.com/shadcn.png" alt="shadcn avatar" /><AvatarFallback
      >FX</AvatarFallback
    ><AvatarBadge aria-label="Online"
  /></Avatar>
</template>
