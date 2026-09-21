<script setup lang="ts">
import { Slider } from '@fex-design/vue/ui/slider'
</script>
<template>
  <div class="grid w-full max-w-xl gap-6">
    <Slider size="sm" :default-value="25" /><Slider size="md" :default-value="50" /><Slider
      size="lg"
      :default-value="75"
    />
  </div>
</template>
