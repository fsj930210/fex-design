<script setup lang="ts">
import { InputNumber } from '@fex-design/vue/ui/input-number'
</script>
<template>
  <div class="grid w-full gap-2">
    <label for="purchase-quantity">购买数量</label
    ><InputNumber
      id="purchase-quantity"
      :default-value="8"
      aria-invalid="true"
      aria-describedby="purchase-quantity-error"
    />
    <p id="purchase-quantity-error" class="text-sm text-danger">购买数量不能超过当前库存 5</p>
  </div>
</template>
