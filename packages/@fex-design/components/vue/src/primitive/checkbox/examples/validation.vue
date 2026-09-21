<script setup lang="ts">
import {
  CheckboxControl,
  CheckboxGroup,
  CheckboxIndicator,
  CheckboxLabel,
  CheckboxRoot,
} from '@fex-design/vue/primitive/checkbox'
</script>

<template>
  <div class="grid gap-3">
    <CheckboxRoot
      ><CheckboxControl
        aria-invalid="true"
        aria-describedby="checkbox-error"
      /><CheckboxIndicator /><CheckboxLabel>同意服务条款</CheckboxLabel></CheckboxRoot
    >
    <p id="checkbox-error" class="text-sm text-destructive">继续前必须同意服务条款。</p>
  </div>
</template>
