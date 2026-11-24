<script lang="ts">
  import {
    DropdownRoot,
    DropdownTrigger,
    DropdownPortal,
    DropdownContent,
    type DropdownPopoverOptions,
  } from "@fex-design/svelte/primitive/dropdown";
  import { MenuItem } from "@fex-design/svelte/primitive/menu";
  import { buttonClassName } from "@fex-design/components-styles/button";
  const cases: { label: string; options: DropdownPopoverOptions }[] = [
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
  {#each cases as item (item.label)}
    <DropdownRoot popoverProps={item.options}>
      <DropdownTrigger
        >{#snippet children({ action, props })}<button
            use:action
            {...props}
            class={buttonClassName()}>{item.label}</button
          >{/snippet}</DropdownTrigger
      >
      <DropdownPortal
        ><DropdownContent
          ><MenuItem value="rename">重命名</MenuItem><MenuItem value="copy"
            >复制</MenuItem
          ></DropdownContent
        ></DropdownPortal
      >
    </DropdownRoot>
  {/each}
</div>
