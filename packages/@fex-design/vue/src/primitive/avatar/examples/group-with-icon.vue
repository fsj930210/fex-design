<script setup lang="ts">
import { PlusIcon } from '@fex-design/vue/icon/plus'
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from '@fex-design/vue/primitive/avatar'
</script>
<template>
  <AvatarGroup
    ><Avatar v-for="i in 3" :key="i"
      ><AvatarImage src="https://github.com/shadcn.png" alt="shadcn avatar" /><AvatarFallback
        >FX</AvatarFallback
      ></Avatar
    ><AvatarGroupCount aria-label="Add avatar"><PlusIcon /></AvatarGroupCount
  ></AvatarGroup>
</template>
