<script setup lang="ts">
import { Button } from '@fex-design/vue/ui/button'
</script>

<template>
  <div class="flex flex-wrap items-center gap-6">
    <Button>Default</Button>
    <Button>Hover / Focus</Button>
    <Button disabled>Disabled</Button>
    <Button aria-pressed="true">Pressed</Button>
  </div>
</template>
