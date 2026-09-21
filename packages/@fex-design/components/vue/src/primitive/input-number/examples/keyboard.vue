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
    <p>ArrowUp 增加，ArrowDown 减少</p>
    <InputNumberRoot default-value="8"
      ><InputNumberControl /><InputNumberActions
        ><InputNumberIncrement /><InputNumberDecrement /></InputNumberActions
    ></InputNumberRoot>
  </div>
</template>
