<script lang="ts">
  import {
    DropdownRoot,
    DropdownTrigger,
    DropdownPortal,
    DropdownContent,
  } from "@fex-design/svelte/primitive/dropdown";
  import { MenuItem } from "@fex-design/svelte/primitive/menu";
  import { buttonClassName } from "@fex-design/components-styles/button";
  let selected = $state("尚未选择");
</script>

<div class="flex min-h-48 flex-col items-start gap-4 p-6">
  <DropdownRoot onActivate={(info) => (selected = info.value)}>
    <DropdownTrigger
      >{#snippet children({ action, props })}<button
          use:action
          {...props}
          class={buttonClassName()}>选择操作</button
        >{/snippet}</DropdownTrigger
    >
    <DropdownPortal
      ><DropdownContent>
        <MenuItem
          value="edit"
          textValue="编辑"
          class="flex h-[var(--menu-item-height)] items-center justify-between gap-6 px-[var(--menu-item-padding-x)] text-sm"
        >
          {#snippet trigger({ action, props })}<button use:action {...props}
              ><span>编辑资料</span><kbd>⌘ E</kbd></button
            >{/snippet}
        </MenuItem>
        <MenuItem
          value="archive"
          textValue="归档"
          class="flex h-[var(--menu-item-height)] items-center justify-between gap-6 px-[var(--menu-item-padding-x)] text-sm"
        >
          {#snippet trigger({ action, props })}<button use:action {...props}
              ><span>归档项目</span><kbd>⌘ A</kbd></button
            >{/snippet}
        </MenuItem>
      </DropdownContent></DropdownPortal
    >
  </DropdownRoot><output>最近操作：{selected}</output>
</div>
