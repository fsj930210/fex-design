<script lang="ts">
  import { Dropdown } from "@fex-design/svelte/ui/dropdown";
  import { Button } from "@fex-design/svelte/ui/button";
  let extended = $state(true);
  let selected = $state("尚未选择");
  const base = [
    { value: "edit", label: "编辑" },
    { value: "copy", label: "复制" },
  ];
  let items = $derived([
    ...base,
    ...(extended
      ? [
          { type: "separator" as const, key: "line" },
          {
            type: "group" as const,
            key: "extra",
            label: "扩展操作",
            children: [
              { value: "archive", label: "归档" },
              { value: "export", label: "导出" },
            ],
          },
        ]
      : []),
  ]);
</script>

<div class="flex min-h-48 flex-col items-start gap-4 p-6">
  <Button onclick={() => (extended = !extended)}
    >{extended ? "隐藏" : "显示"}扩展操作</Button
  ><Dropdown {items} onActivate={(info) => (selected = info.value)}
    >操作</Dropdown
  ><output>最近操作：{selected}</output>
</div>
