<script lang="ts">
  import { Dropdown } from "@fex-design/svelte/ui/dropdown";
  let selected = $state("尚未选择");
  const items = [
    { value: "edit", label: "编辑资料", textValue: "编辑" },
    { value: "archive", label: "归档项目", textValue: "归档" },
  ];
</script>

<div class="flex min-h-48 flex-col items-start gap-4 p-6">
  <Dropdown {items} onActivate={(info) => (selected = info.value)}
    >选择操作{#snippet item(item, binding)}<button
        use:binding.action
        {...binding.props}
        class={`${binding.props.class ?? ""} flex items-center justify-between gap-6`}
        ><span>{item.label}</span><kbd
          >{item.value === "edit" ? "⌘ E" : "⌘ A"}</kbd
        ></button
      >{/snippet}</Dropdown
  ><output>最近操作：{selected}</output>
</div>
