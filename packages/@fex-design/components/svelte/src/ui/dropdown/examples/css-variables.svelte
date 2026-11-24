<script lang="ts">
  import { Dropdown } from "@fex-design/svelte/ui/dropdown";
  let container: HTMLDivElement | undefined;
  let value = $state("尚未选择");
  const items = [
    { value: "rename", label: "重命名" },
    { value: "duplicate", label: "复制" },
    { value: "archive", label: "归档", disabled: true },
  ];
  const popoverProps = { getPopupContainer: () => container ?? null };
</script>

<div class="flex min-h-48 flex-col items-start gap-4 p-6">
  <div
    bind:this={container}
    class="[--popover-background:#f5f3ff] [--popover-border:#8b5cf6] [--popover-foreground:#4c1d95] [--menu-item-hover-background:#ddd6fe]"
  >
    <Dropdown {items} {popoverProps} onActivate={(info) => (value = info.value)}
      >操作</Dropdown
    >
  </div>
  <output>最近操作：{value}</output>
</div>
