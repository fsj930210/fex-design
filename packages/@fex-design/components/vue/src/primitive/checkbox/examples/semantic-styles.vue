<script setup lang="ts">
import {
  CheckboxRoot,
  CheckboxControl,
  CheckboxIndicator,
  CheckboxLabel,
} from '@fex-design/vue/primitive/checkbox'
</script>
<template>
  <CheckboxRoot class="gap-3">
    <CheckboxControl
      default-checked
      class="ring-2 ring-orange-300"
      :style="{ backgroundColor: '#ea580c', borderColor: '#c2410c' }"
    />
    <CheckboxIndicator class="drop-shadow-sm" style="color: #ffffff" />
    <CheckboxLabel class="font-bold" style="color: #6d28d9">结构化样式</CheckboxLabel>
  </CheckboxRoot>
</template>
