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
  <p>允许范围：1–10 · 当前值：20 · 状态：超出最大值</p>
  <P value={20} min={1} max={10}><C /><A><I /><D /></A></P>
</div>
