<script lang="ts">
  import { Menu } from "@fex-design/svelte/ui/menu";
  let value = $state<string[]>([]);
  const items = [
    { value: "overview", label: "概览" },
    { value: "members", label: "成员" },
    { value: "billing", label: "账单", disabled: true },
  ];
</script>

<div class="grid w-full max-w-xs gap-3">
  <Menu
    onValueChange={(next) => (value = next)}
    {items}
    aria-label="基本菜单"
  />
  <output>选中值：{JSON.stringify(value)}</output>
</div>
