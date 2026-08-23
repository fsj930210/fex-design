<script setup lang="ts">
import { Avatar, AvatarFallback } from '@fex-design/vue/primitive/avatar'
import Card from '@fex-design/vue/ui/card'
</script>
<template>
  <Card title="Shape" description="Avatar supports circle and square shapes.">
    <div class="flex items-center gap-3">
      <Avatar shape="circle"><AvatarFallback>CI</AvatarFallback></Avatar>
      <Avatar shape="square"><AvatarFallback>SQ</AvatarFallback></Avatar>
    </div>
  </Card>
</template>
