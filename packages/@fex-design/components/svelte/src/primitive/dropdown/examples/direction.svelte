<script lang="ts">
  import {
    DropdownRoot,
    DropdownTrigger,
    DropdownPortal,
    DropdownContent,
  } from "@fex-design/svelte/primitive/dropdown";
  import {
    MenuItem,
    SubMenu,
    SubMenuTrigger,
    SubMenuContent,
  } from "@fex-design/svelte/primitive/menu";
  import { buttonClassName } from "@fex-design/components-styles/button";
  const directions = ["ltr", "rtl"] as const;
</script>

<div class="flex min-h-64 flex-wrap justify-around gap-8 p-6">
  {#each directions as dir (dir)}
    <div {dir} class="flex flex-col items-start gap-3">
      <span>{dir.toUpperCase()}</span>
      <DropdownRoot menuProps={{ dir }}>
        <DropdownTrigger
          >{#snippet children({ action, props })}<button
              use:action
              {...props}
              class={buttonClassName()}>操作</button
            >{/snippet}</DropdownTrigger
        >
        <DropdownPortal
          ><DropdownContent
            ><MenuItem value="rename">重命名</MenuItem>
            <SubMenu value="share"
              ><SubMenuTrigger>分享</SubMenuTrigger><SubMenuContent
                ><MenuItem value="link">复制链接</MenuItem></SubMenuContent
              ></SubMenu
            >
          </DropdownContent></DropdownPortal
        >
      </DropdownRoot>
    </div>
  {/each}
</div>
