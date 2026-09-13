<script setup lang="ts">
import { CheckboxControl, CheckboxGroup, CheckboxIndicator, CheckboxLabel, CheckboxRoot } from '@fex-design/vue/primitive/checkbox'
</script>

<template>
  <div class="grid gap-3"><CheckboxRoot size="sm"><CheckboxControl default-checked /><CheckboxIndicator /><CheckboxLabel>小尺寸</CheckboxLabel></CheckboxRoot><CheckboxRoot size="md"><CheckboxControl default-checked /><CheckboxIndicator /><CheckboxLabel>中尺寸</CheckboxLabel></CheckboxRoot><CheckboxRoot size="lg"><CheckboxControl default-checked /><CheckboxIndicator /><CheckboxLabel>大尺寸</CheckboxLabel></CheckboxRoot></div>
</template>
