<script lang="ts">
  import { Dropdown } from "@fex-design/svelte/ui/dropdown";
  let container: HTMLDivElement | undefined;
  const items = [
    { value: "rename", label: "重命名" },
    { value: "duplicate", label: "复制" },
  ];
</script>

<div class="grid gap-3 p-6">
  <p>浮层挂载到虚线区域，定位仍以触发器为参照。</p>
  <div
    bind:this={container}
    class="relative min-h-48 rounded-lg border-2 border-dashed p-6"
  >
    <Dropdown {items} popoverProps={{ getPopupContainer: () => container }}
      >操作</Dropdown
    >
  </div>
</div>
