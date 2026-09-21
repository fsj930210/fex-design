<script setup lang="ts">
import {
  InputNumberActions,
  InputNumberClear,
  InputNumberControl,
  InputNumberDecrement,
  InputNumberIncrement,
  InputNumberRoot,
} from '@fex-design/vue/primitive/input-number'
import { InputPrefix, InputSuffix } from '@fex-design/vue/primitive/input'
</script>
<template>
  <div class="grid w-full gap-2">
    <p>允许范围：1–10 · 当前值：20 · 状态：超出最大值</p>
    <InputNumberRoot :value="20" :min="1" :max="10"
      ><InputNumberControl /><InputNumberActions
        ><InputNumberIncrement /><InputNumberDecrement /></InputNumberActions
    ></InputNumberRoot>
  </div>
</template>
