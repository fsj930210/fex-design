<script setup lang="ts">
import { Button } from '@fex-design/vue/ui/button'
</script>

<template>
  <div class="flex flex-wrap items-center gap-3">
    <Button loading>Saving</Button>
    <Button loading icon-placement="end">Publishing</Button>
    <Button loading variant="outline">Loading</Button>
  </div>
</template>
