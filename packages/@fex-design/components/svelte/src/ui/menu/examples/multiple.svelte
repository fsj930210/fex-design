<script lang="ts">
  import { Button } from "@fex-design/svelte/ui/button";
  import { Menu, MenuItem } from "@fex-design/svelte/ui/menu";
  import { menuSelectionItems } from "@fex-design/docs-shared/menu-demo";
  let multiple = $state(false),
    value = $state(["users"]);
</script>

<div class="grid w-full max-w-xs gap-3">
  <div class="flex gap-2">
    <Button
      onclick={() => {
        multiple = !multiple;
        if (!multiple) value = value.slice(0, 1);
      }}>切换单选 / 多选</Button
    ><Button
      onclick={() => {
        multiple = false;
        value = ["users"];
      }}>重置</Button
    >
  </div>
  <Menu
    layout="inline"
    {multiple}
    {value}
    onValueChange={(next) => (value = next)}
    >{#each menuSelectionItems as item (item.value)}<MenuItem
        value={item.value}
        disabled={item.disabled}>{item.label}</MenuItem
      >{/each}</Menu
  >
  <output>multiple: {multiple}; value: {JSON.stringify(value)}</output>
</div>
