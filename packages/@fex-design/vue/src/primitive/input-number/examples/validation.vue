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
    <label for="purchase-quantity">购买数量</label
    ><InputNumberRoot :default-value="8"
      ><InputNumberControl
        id="purchase-quantity"
        aria-invalid="true"
        aria-describedby="purchase-quantity-error" /><InputNumberActions
        ><InputNumberIncrement /><InputNumberDecrement /></InputNumberActions
    ></InputNumberRoot>
    <p id="purchase-quantity-error" class="text-sm text-danger">购买数量不能超过当前库存 5</p>
  </div>
</template>
