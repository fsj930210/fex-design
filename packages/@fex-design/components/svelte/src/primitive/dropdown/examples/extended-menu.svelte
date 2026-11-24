<script lang="ts">
  import {
    DropdownRoot,
    DropdownTrigger,
    DropdownPortal,
    DropdownContent,
  } from "@fex-design/svelte/primitive/dropdown";
  import {
    MenuItem,
    MenuGroup,
    MenuGroupLabel,
    MenuSeparator,
  } from "@fex-design/svelte/primitive/menu";
  import { buttonClassName } from "@fex-design/components-styles/button";
  let extended = $state(true);
  let selected = $state("尚未选择");
</script>

<div class="flex min-h-48 flex-col items-start gap-4 p-6">
  <button class={buttonClassName()} onclick={() => (extended = !extended)}
    >{extended ? "隐藏" : "显示"}扩展操作</button
  >
  <DropdownRoot onActivate={(info) => (selected = info.value)}>
    <DropdownTrigger
      >{#snippet children({ action, props })}<button
          use:action
          {...props}
          class={buttonClassName()}>操作</button
        >{/snippet}</DropdownTrigger
    >
    <DropdownPortal
      ><DropdownContent
        ><MenuItem value="edit">编辑</MenuItem><MenuItem value="copy"
          >复制</MenuItem
        >
        {#if extended}<MenuSeparator /><MenuGroup
            ><MenuGroupLabel>扩展操作</MenuGroupLabel><MenuItem value="archive"
              >归档</MenuItem
            ><MenuItem value="export">导出</MenuItem></MenuGroup
          >{/if}
      </DropdownContent></DropdownPortal
    >
  </DropdownRoot><output>最近操作：{selected}</output>
</div>
