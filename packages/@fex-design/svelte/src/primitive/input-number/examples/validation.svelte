<script lang="ts">
  import {
    InputNumberActions as A,
    InputNumberClear as CL,
    InputNumberControl as C,
    InputNumberDecrement as D,
    InputNumberIncrement as I,
    InputNumberRoot as P,
  } from "@fex-design/svelte/primitive/input-number";
  import { InputPrefix, InputSuffix } from "@fex-design/svelte/primitive/input";
</script>

<div class="grid w-full gap-2">
  <label for="purchase-quantity">购买数量</label><P defaultValue={8}
    ><C
      id="purchase-quantity"
      aria-invalid="true"
      aria-describedby="purchase-quantity-error"
    /><A><I /><D /></A></P
  >
  <p id="purchase-quantity-error" class="text-sm text-danger">
    购买数量不能超过当前库存 5
  </p>
</div>
