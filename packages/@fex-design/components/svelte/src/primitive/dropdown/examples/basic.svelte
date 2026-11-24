<script lang="ts">
  import {
    DropdownRoot,
    DropdownTrigger,
    DropdownPortal,
    DropdownContent,
  } from "@fex-design/svelte/primitive/dropdown";
  import { MenuItem } from "@fex-design/svelte/primitive/menu";
  import { buttonClassName } from "@fex-design/components-styles/button";
  let value = $state("尚未选择");
</script>

<div class="flex min-h-48 flex-col items-start gap-4 p-6">
  <DropdownRoot onActivate={(info) => (value = info.value)}>
    <DropdownTrigger>
      {#snippet children({ action, props })}
        <button use:action {...props} class={buttonClassName()}>操作</button>
      {/snippet}
    </DropdownTrigger>
    <DropdownPortal
      ><DropdownContent>
        <MenuItem value="rename">重命名</MenuItem>
        <MenuItem value="duplicate">复制</MenuItem>
        <MenuItem value="archive" disabled>归档</MenuItem>
      </DropdownContent></DropdownPortal
    >
  </DropdownRoot>
  <output>最近操作：{value}</output>
</div>
