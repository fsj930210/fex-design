<script setup lang="ts">
import { InputNumber } from '@fex-design/vue/ui/input-number'
</script>
<template>
  <div class="grid w-full gap-2">
    <p>Clear、单位与增减操作可以同时存在</p>
    <InputNumber :default-value="128" clearable
      ><template #prefix>￥</template><template #suffix>元</template></InputNumber
    >
  </div>
</template>
