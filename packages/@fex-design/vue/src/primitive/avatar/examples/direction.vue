<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from '@fex-design/vue/primitive/avatar'
</script>
<template>
  <div class="flex items-center gap-8">
    <div dir="ltr">
      <p class="mb-2 text-xs text-muted-foreground">LTR</p>
      <AvatarGroup
        ><Avatar v-for="i in 3" :key="i"
          ><AvatarImage src="https://github.com/shadcn.png" alt="shadcn avatar" /><AvatarFallback
            >FX</AvatarFallback
          ></Avatar
        ></AvatarGroup
      >
    </div>
    <div dir="rtl">
      <p class="mb-2 text-xs text-muted-foreground">RTL</p>
      <AvatarGroup
        ><Avatar v-for="i in 3" :key="i"
          ><AvatarImage src="https://github.com/shadcn.png" alt="shadcn avatar" /><AvatarFallback
            >FX</AvatarFallback
          ></Avatar
        ></AvatarGroup
      >
    </div>
  </div>
</template>
