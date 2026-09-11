<script lang="ts">
  import { Input } from "@fex-design/svelte/ui/input";
  import { Button } from "@fex-design/svelte/ui/button";
  let value = $state("受控内容");
</script>

<div class="grid w-full gap-3">
  <Input {value} onValueChange={(next) => (value = next)} clearable /><Input
    defaultValue="非受控内容"
    clearable
  />
  <div class="flex gap-2">
    <Button onclick={() => (value = "外部设置")}>外部设置</Button><Button
      onclick={() => (value = "")}>外部清空</Button
    >
  </div>
</div>
