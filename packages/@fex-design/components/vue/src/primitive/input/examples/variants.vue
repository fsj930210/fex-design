<script setup lang="ts">
import { InputControl, InputRoot } from '@fex-design/vue/primitive/input'
const variants = ['outlined', 'filled', 'borderless', 'underlined'] as const
</script>
<template>
  <div class="grid w-full gap-3">
    <InputRoot v-for="variant in variants" :key="variant" :variant="variant"
      ><InputControl :placeholder="variant"
    /></InputRoot>
  </div>
</template>
