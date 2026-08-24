<script setup lang="ts">
import { PlusIcon } from '@fex-design/vue/icon/plus'
import { Button } from '@fex-design/vue/ui/button'
const effects = [
  'expand-icon',
  'ring-hover',
  'shine-hover',
  'gooey-start',
  'gooey-end',
  'underline',
  'hover-underline',
  'press',
] as const
</script>

<template>
  <div class="flex flex-wrap items-center gap-3">
    <Button v-for="item in effects" :key="item" :effect="item">
      <template #icon> <PlusIcon /> </template>{{ item }}</Button
    >
  </div>
</template>
