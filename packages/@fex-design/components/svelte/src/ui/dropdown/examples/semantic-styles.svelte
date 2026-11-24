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
    class="[&_[role=menu]]:border-blue-500 [&_[role=menu]]:bg-blue-50 [&_[role=menu]]:text-blue-950 [&_[role=menuitem]]:font-semibold [&_[role=menuitem]]:hover:bg-blue-200"
  >
    <Dropdown {items} {popoverProps} onActivate={(info) => (value = info.value)}
      >操作</Dropdown
    >
  </div>
  <output>最近操作：{value}</output>
</div>
