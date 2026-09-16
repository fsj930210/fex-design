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
  <p>范围：0–10 · 步长：0.25 · 精度：2</p>
  <P defaultValue={8.25} min={0} max={10} step={0.25} precision={2}
    ><C /><A><I /><D /></A></P
  >
</div>
