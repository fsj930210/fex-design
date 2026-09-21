<script setup lang="ts">
import { RadioButtonGroup, RadioGroup } from '@fex-design/vue/ui/radio'
const options = [
  { label: '苹果', value: 'apple' },
  { label: '梨', value: 'pear' },
]
</script>
<template>
  <div class="grid gap-4">
    <section class="grid gap-2">
      <span class="text-sm text-muted-foreground">Radio</span
      ><RadioGroup default-value="apple" orientation="horizontal" :options="options" />
    </section>
    <section class="grid gap-2">
      <span class="text-sm text-muted-foreground">RadioButton</span
      ><RadioButtonGroup default-value="apple" orientation="horizontal" :options="options" />
    </section>
  </div>
</template>
