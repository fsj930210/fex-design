<script setup lang="ts">
import { Avatar } from '@fex-design/vue/ui/avatar'
</script>
<template>
  <div class="flex items-center gap-3">
    <Avatar shape="circle" fallback="CI" /><Avatar shape="square" fallback="SQ" />
  </div>
</template>
