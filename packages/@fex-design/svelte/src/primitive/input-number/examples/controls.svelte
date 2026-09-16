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
  <p>默认控制与隐藏控制</p>
  <P defaultValue={8}><C /><A><I /><D /></A></P><P defaultValue={8}><C /></P>
</div>
