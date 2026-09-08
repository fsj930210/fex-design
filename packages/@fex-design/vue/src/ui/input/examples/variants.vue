<script setup lang="ts">
import { Input } from '@fex-design/vue/ui/input'
const variants = ['outlined', 'filled', 'borderless', 'underlined'] as const
</script>
<template>
  <div class="grid w-full gap-3">
    <Input v-for="variant in variants" :key="variant" :variant="variant" :placeholder="variant" />
  </div>
</template>
