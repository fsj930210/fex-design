<script setup lang="ts">
import { InputControl, InputRoot } from '@fex-design/vue/primitive/input'
const sizes = ['sm', 'md', 'lg'] as const
</script>
<template>
  <div class="grid w-full gap-3">
    <InputRoot v-for="size in sizes" :key="size" :size="size"
      ><InputControl :placeholder="size"
    /></InputRoot>
  </div>
</template>
