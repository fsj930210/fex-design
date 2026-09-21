<script lang="ts">
  import { Button } from "@fex-design/svelte/primitive/button";
  import { InputControl, InputRoot } from "@fex-design/svelte/primitive/input";
  let control: HTMLInputElement | null = $state(null);
</script>

<div class="grid w-full gap-3">
  <InputRoot defaultValue="通过 ref 控制"
    ><InputControl bind:ref={control} /></InputRoot
  >
  <div class="flex gap-2">
    <Button onclick={() => control?.focus()}>聚焦</Button><Button
      onclick={() => control?.blur()}>失焦</Button
    ><Button onclick={() => control?.select()}>全选</Button>
  </div>
</div>
