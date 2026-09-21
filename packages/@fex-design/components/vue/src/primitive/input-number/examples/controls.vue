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
    <p>默认控制与隐藏控制</p>
    <InputNumberRoot default-value="8"
      ><InputNumberControl /><InputNumberActions
        ><InputNumberIncrement /><InputNumberDecrement /></InputNumberActions></InputNumberRoot
    ><InputNumberRoot :default-value="8"><InputNumberControl /></InputNumberRoot>
  </div>
</template>
