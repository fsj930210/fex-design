<script setup lang="ts">
import { Avatar } from '@fex-design/vue/ui/avatar'
</script>
<template>
  <div class="flex items-center gap-3">
    <Avatar size="sm" fallback="SM" /><Avatar size="md" fallback="MD" /><Avatar
      size="lg"
      fallback="LG"
    />
  </div>
</template>
