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
    <label for="quantity">数量</label>
    <InputNumberRoot default-value="8"
      ><InputNumberControl id="quantity" /><InputNumberActions
        ><InputNumberIncrement /><InputNumberDecrement /></InputNumberActions
    ></InputNumberRoot>
    <p class="text-sm text-muted-foreground">使用加减按钮或直接输入数字</p>
  </div>
</template>
