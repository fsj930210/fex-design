<script setup lang="ts">
import { Avatar, AvatarFallback } from '@fex-design/vue/primitive/avatar'
</script>
<template>
  <Avatar
    class="ring-2 ring-primary"
    :style="{ boxShadow: '0 0 0 4px color-mix(in srgb, var(--primary) 20%, transparent)' }"
    ><AvatarFallback class="bg-primary text-primary-foreground">FX</AvatarFallback></Avatar
  >
</template>
