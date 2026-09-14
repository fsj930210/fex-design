<script setup lang="ts">
import { Radio, RadioButton, RadioGroup } from '@fex-design/vue/ui/radio'
</script>
<template>
  <div class="grid gap-4"><RadioGroup default-value="apple"><Radio value="apple" :class-names="{ root: 'gap-3', control: 'ring-2 ring-orange-300 [--radio-checked-color:var(--success)]', label: 'font-bold text-violet-700' }">苹果</Radio></RadioGroup><RadioGroup default-value="apple" orientation="horizontal" class="gap-0"><RadioButton value="apple" class="[--radio-button-checked-background:var(--success)]">苹果按钮</RadioButton><RadioButton value="pear">梨按钮</RadioButton></RadioGroup></div>
</template>
