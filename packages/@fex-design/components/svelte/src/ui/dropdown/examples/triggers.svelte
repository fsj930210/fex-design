<script lang="ts">
  import { Dropdown } from "@fex-design/svelte/ui/dropdown";
  let value = $state("尚未选择");
  const items = [
    { value: "rename", label: "重命名" },
    { value: "duplicate", label: "复制" },
  ];
  const cases = [
    { label: "点击", options: { trigger: ["click"] } },
    { label: "悬停", options: { trigger: ["hover"] } },
    { label: "聚焦", options: { trigger: ["focus"] } },
    { label: "悬停 + 聚焦", options: { trigger: ["hover", "focus"] } },
    {
      label: "悬停延迟",
      options: {
        trigger: ["hover"],
        hoverOpenDelay: 300,
        hoverCloseDelay: 400,
      },
    },
  ];
</script>

<div class="flex min-h-64 flex-wrap items-center justify-center gap-3 p-6">
  {#each cases as item (item.label)}<Dropdown
      {items}
      popoverProps={item.options}>{item.label}</Dropdown
    >{/each}
</div>
