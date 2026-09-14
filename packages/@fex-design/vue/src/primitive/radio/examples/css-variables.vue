<script setup lang="ts">
import { Radio, RadioButton, RadioGroup } from '@fex-design/vue/primitive/radio'
</script>
<template>
  <div class="grid gap-3"><RadioGroup default-value="custom"><Radio value="custom" aria-label="自定义" class="[--radio-size:1.5rem] [--radio-checked-color:var(--success)]" /></RadioGroup><RadioGroup default-value="button" class="gap-0"><RadioButton value="button" class="[--radio-button-checked-background:var(--success)]">自定义按钮</RadioButton></RadioGroup></div>
</template>
