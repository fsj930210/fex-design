<script setup lang="ts">
import { Input } from '@fex-design/vue/ui/input'
const sizes = ['sm', 'md', 'lg'] as const
</script>
<template>
  <div class="grid w-full gap-3">
    <Input v-for="size in sizes" :key="size" :size="size" :placeholder="size" />
  </div>
</template>
