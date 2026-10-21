<script setup lang="ts">
import { Button } from '@fex-design/vue/ui/button'
defineOptions({ name: 'ButtonSemanticStylesExample' })
</script>
<template>
  <div class="flex flex-wrap gap-4">
    <Button
      loading
      icon-placement="start"
      :start-icon-props="{ class: 'rounded bg-violet-100 p-0.5' }"
      :loading-icon-props="{ class: 'text-violet-700' }"
      >Start</Button
    ><Button
      loading
      icon-placement="end"
      :end-icon-props="{ class: 'rounded bg-cyan-100 p-0.5' }"
      :loading-icon-props="{ class: 'text-cyan-700' }"
      >End</Button
    >
  </div>
</template>
