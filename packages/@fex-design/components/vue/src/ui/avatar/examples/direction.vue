<script setup lang="ts">
import { Avatar, AvatarGroup } from '@fex-design/vue/ui/avatar'
</script>
<template>
  <div class="flex items-center gap-8">
    <div dir="ltr">
      <p>LTR · 中文示例</p>
      <AvatarGroup
        ><Avatar v-for="i in 3" :key="i" src="https://github.com/shadcn.png" fallback="FX"
      /></AvatarGroup>
    </div>
    <div dir="rtl">
      <p>RTL · مثال عربي</p>
      <AvatarGroup
        ><Avatar v-for="i in 3" :key="i" src="https://github.com/shadcn.png" fallback="FX"
      /></AvatarGroup>
    </div>
  </div>
</template>
