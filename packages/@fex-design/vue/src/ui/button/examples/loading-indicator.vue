<script setup lang="ts">
import { Button } from '@fex-design/vue/ui/button'
</script>

<template>
  <div class="flex flex-wrap items-center gap-3">
    <Button loading>
      <template #loadingIndicator> <span class="animate-pulse">•••</span> </template
      >Uploading</Button
    >
  </div>
</template>
