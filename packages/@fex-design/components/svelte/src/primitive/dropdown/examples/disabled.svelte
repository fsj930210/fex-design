<script lang="ts">
  import {
    DropdownRoot,
    DropdownTrigger,
    DropdownPortal,
    DropdownContent,
  } from "@fex-design/svelte/primitive/dropdown";
  import { MenuItem } from "@fex-design/svelte/primitive/menu";
  import { buttonClassName } from "@fex-design/components-styles/button";
  let disabled = $state(false);
</script>

<div class="flex min-h-48 flex-col items-start gap-4 p-6">
  <button class={buttonClassName()} onclick={() => (disabled = !disabled)}
    >切换禁用</button
  >
  <DropdownRoot {disabled}>
    <DropdownTrigger>
      {#snippet children({ action, props })}
        <button use:action {...props} class={buttonClassName()}>操作</button>
      {/snippet}
    </DropdownTrigger>
    <DropdownPortal
      ><DropdownContent>
        <MenuItem value="rename">重命名</MenuItem><MenuItem value="duplicate"
          >复制</MenuItem
        >
      </DropdownContent></DropdownPortal
    >
  </DropdownRoot>
  <output>触发器状态：{disabled ? "禁用" : "启用"}</output>
</div>
