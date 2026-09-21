<script setup lang="ts">
import { Slider } from '@fex-design/vue/ui/slider'
</script>
<template>
  <div class="grid w-full max-w-xl gap-6">
    <Slider :default-value="[20, 80]" :step="5" :min-steps-between-thumbs="2" /><Slider
      :default-value="[15, 40, 70]"
    />
  </div>
</template>
