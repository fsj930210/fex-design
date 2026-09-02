<script setup lang="ts">
import { Alert } from '@fex-design/vue/ui/alert'
</script>

<template>
  <div class="grid w-full gap-3">
    <Alert variant="filled" show-icon title="Filled Alert" />
    <Alert variant="outlined" show-icon title="Outlined Alert" />
    <Alert variant="solid" show-icon title="Solid Alert" />
  </div>
</template>
