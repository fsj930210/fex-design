<script lang="ts">
  import {
    DropdownRoot,
    DropdownTrigger,
    DropdownPortal,
    DropdownContent,
  } from "@fex-design/svelte/primitive/dropdown";
  import { MenuItem } from "@fex-design/svelte/primitive/menu";
  import { buttonClassName } from "@fex-design/components-styles/button";
  let open = $state(false);
  let uncontrolledOpen = $state(false);
</script>

<div class="flex min-h-48 flex-col items-start gap-4 p-6">
  <button class={buttonClassName()} onclick={() => (open = !open)}
    >外部切换</button
  >
  <DropdownRoot {open} onOpenChange={(next) => (open = next)}>
    <DropdownTrigger>
      {#snippet children({ action, props })}
        <button use:action {...props} class={buttonClassName()}>受控菜单</button
        >
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
  <output>菜单状态：{open ? "打开" : "关闭"}</output>
  <DropdownRoot
    defaultOpen={false}
    onOpenChange={(next) => (uncontrolledOpen = next)}
  >
    <DropdownTrigger
      >{#snippet children({ action, props })}<button
          use:action
          {...props}
          class={buttonClassName()}>非受控菜单</button
        >{/snippet}</DropdownTrigger
    >
    <DropdownPortal
      ><DropdownContent
        ><MenuItem value="rename">重命名</MenuItem><MenuItem value="duplicate"
          >复制</MenuItem
        ></DropdownContent
      ></DropdownPortal
    >
  </DropdownRoot>
  <output>非受控菜单状态：{uncontrolledOpen ? "打开" : "关闭"}</output>
</div>
