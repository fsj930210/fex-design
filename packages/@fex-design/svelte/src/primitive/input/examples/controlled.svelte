<script lang="ts">
  import { Button } from "@fex-design/svelte/primitive/button";
  import {
    InputClear,
    InputControl,
    InputRoot,
  } from "@fex-design/svelte/primitive/input";
  let value = $state("受控内容");
</script>

<div class="grid w-full gap-3">
  <InputRoot {value} onValueChange={(next) => (value = next)}
    ><InputControl /><InputClear /></InputRoot
  ><InputRoot defaultValue="非受控内容"
    ><InputControl /><InputClear /></InputRoot
  >
  <div class="flex gap-2">
    <Button onclick={() => (value = "外部设置")}>外部设置</Button><Button
      onclick={() => (value = "")}>外部清空</Button
    >
  </div>
</div>
