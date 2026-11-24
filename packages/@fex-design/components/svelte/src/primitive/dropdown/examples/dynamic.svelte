<script lang="ts">
  import {
    DropdownRoot,
    DropdownTrigger,
    DropdownPortal,
    DropdownContent,
  } from "@fex-design/svelte/primitive/dropdown";
  import { MenuItem } from "@fex-design/svelte/primitive/menu";
  import { buttonClassName } from "@fex-design/components-styles/button";
  let hasItems = $state(true);
</script>

<div class="flex min-h-48 flex-col items-start gap-4 p-6">
  <button class={buttonClassName()} onclick={() => (hasItems = !hasItems)}
    >切换菜单项</button
  >
  <DropdownRoot closeOnSelect={false}
    ><DropdownTrigger
      >{#snippet children({ action, props })}
        <button use:action {...props} class={buttonClassName()}>操作</button>
      {/snippet}</DropdownTrigger
    ><DropdownPortal
      ><DropdownContent
        aria-label={hasItems ? "操作菜单" : "操作菜单，无可用操作"}
      >
        {#if hasItems}<MenuItem value="rename">重命名</MenuItem><MenuItem
            value="duplicate">复制</MenuItem
          ><MenuItem value="clear" onclick={() => (hasItems = false)}
            >移除菜单项</MenuItem
          >
        {:else}<span aria-hidden="true" class="px-3 py-2 text-muted-foreground"
            >暂无操作</span
          >{/if}
      </DropdownContent></DropdownPortal
    ></DropdownRoot
  >
  <output>菜单项：{hasItems ? "三个" : "无"}</output>
</div>
