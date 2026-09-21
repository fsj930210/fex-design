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
  <label for="quantity">数量</label><P defaultValue={8}
    ><C id="quantity" /><A><I /><D /></A></P
  >
  <p class="text-sm text-muted-foreground">使用加减按钮或直接输入数字</p>
</div>
