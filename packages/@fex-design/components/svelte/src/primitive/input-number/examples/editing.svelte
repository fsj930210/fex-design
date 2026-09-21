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
  <p>可输入 -、1. 等编辑中间状态，失焦后提交。</p>
  <P defaultValue={1} precision={2}><C /><A><I /><D /></A></P>
</div>
