<script setup lang="ts">
import { Checkbox, CheckboxGroup } from '@fex-design/vue/ui/checkbox'
</script>

<template>
  <div class="grid gap-3">
    <Checkbox
      default-checked
      style="
        --checkbox-size: 1.25rem;
        --checkbox-checked-background: #7c3aed;
        --checkbox-indicator-color: white;
      "
      >品牌色 Checkbox</Checkbox
    >
  </div>
</template>
