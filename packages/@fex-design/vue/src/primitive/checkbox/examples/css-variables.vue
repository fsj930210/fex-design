<script setup lang="ts">
import { CheckboxControl, CheckboxGroup, CheckboxIndicator, CheckboxLabel, CheckboxRoot } from '@fex-design/vue/primitive/checkbox'
</script>

<template>
  <div class="grid gap-3"><CheckboxRoot style="--checkbox-size:1.25rem;--checkbox-checked-background:#7c3aed;--checkbox-indicator-color:white"><CheckboxControl default-checked /><CheckboxIndicator /><CheckboxLabel>品牌色 Checkbox</CheckboxLabel></CheckboxRoot></div>
</template>
