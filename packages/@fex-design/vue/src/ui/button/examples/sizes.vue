<script setup lang="ts">
import { Button } from '@fex-design/vue/ui/button'
const sizes = [
  'xs',
  'sm',
  'default',
  'lg',
  'xl',
  'icon-xs',
  'icon-sm',
  'icon',
  'icon-lg',
  'icon-xl',
] as const
</script>

<template>
  <div class="flex flex-wrap items-center gap-3">
    <Button v-for="item in sizes" :key="item" :size="item" :aria-label="item">{{ item }}</Button>
  </div>
</template>
