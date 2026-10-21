<script setup lang="ts">
import { InputNumber } from '@fex-design/vue/ui/input-number'
import {
  inputNumberStyleDemo as demo,
  inputNumberSemanticClasses as classNames,
} from '@fex-design/docs-shared/input-number-demo'
defineOptions({ name: 'InputNumberSemanticStylesExample' })
</script>
<template>
  <div class="grid w-full gap-3">
    <InputNumber :default-value="demo.value" clearable :class-names="classNames">
      <template #prefix>{{ demo.prefix }}</template>
      <template #suffix>{{ demo.suffix }}</template>
    </InputNumber>
  </div>
</template>
