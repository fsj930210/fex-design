<script setup lang="ts">
import { Radio, RadioButton, RadioGroup } from '@fex-design/vue/ui/radio'
</script>
<template>
  <div class="grid gap-4">
    <RadioGroup default-value="checked" orientation="horizontal"
      ><Radio value="empty">未选中</Radio><Radio value="checked">已选中</Radio
      ><Radio value="disabled" disabled>禁用</Radio></RadioGroup
    ><RadioGroup default-value="checked" orientation="horizontal" class="gap-0"
      ><RadioButton value="empty">未选中</RadioButton
      ><RadioButton value="checked">已选中</RadioButton
      ><RadioButton value="disabled" disabled>禁用</RadioButton></RadioGroup
    >
  </div>
</template>
