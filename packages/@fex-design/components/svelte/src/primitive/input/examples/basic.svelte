<script lang="ts">
  let { invalid = false } = $props<{ invalid?: boolean }>();
  import {
    InputClear,
    InputControl,
    InputRoot,
  } from "@fex-design/svelte/primitive/input";
</script>

<div class="grid w-full gap-3">
  <InputRoot aria-invalid={invalid}
    ><InputControl placeholder="请输入内容" /></InputRoot
  ><InputRoot aria-invalid={invalid} defaultValue="可清除内容"
    ><InputControl /><InputClear /></InputRoot
  >
</div>
