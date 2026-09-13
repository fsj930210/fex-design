<script setup lang="ts">
import { CheckboxControl, CheckboxGroup, CheckboxIndicator, CheckboxLabel, CheckboxRoot } from '@fex-design/vue/primitive/checkbox'
</script>

<template>
  <div class="grid gap-3"><CheckboxRoot><CheckboxControl  /><CheckboxIndicator /><CheckboxLabel>接收产品更新</CheckboxLabel></CheckboxRoot><CheckboxRoot><CheckboxControl default-checked /><CheckboxIndicator /><CheckboxLabel>接收安全提醒</CheckboxLabel></CheckboxRoot></div>
</template>
