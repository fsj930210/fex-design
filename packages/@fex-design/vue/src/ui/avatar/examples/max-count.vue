<script setup lang="ts">
import { Avatar, AvatarGroup } from '@fex-design/vue/ui/avatar'
</script>
<template>
  <AvatarGroup :max-count="3"
    ><Avatar
      v-for="i in 6"
      :key="i"
      shape="square"
      src="https://github.com/shadcn.png"
      fallback="FX"
  /></AvatarGroup>
</template>
