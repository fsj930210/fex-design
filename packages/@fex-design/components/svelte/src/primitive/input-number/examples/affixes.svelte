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
  <p>Clear、单位与增减操作可以同时存在</p>
  <P defaultValue={128}
    ><InputPrefix>￥</InputPrefix><C /><CL /><InputSuffix>元</InputSuffix><A
      ><I /><D /></A
    ></P
  >
</div>
