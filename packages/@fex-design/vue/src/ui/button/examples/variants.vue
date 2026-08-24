<script setup lang="ts">
import { Button } from '@fex-design/vue/ui/button'
const variants = [
  'default',
  'outline',
  'secondary',
  'ghost',
  'destructive',
  'link',
  'dashed',
] as const
</script>

<template>
  <div class="flex flex-wrap items-center gap-3">
    <Button v-for="item in variants" :key="item" :variant="item">{{ item }}</Button>
  </div>
</template>
