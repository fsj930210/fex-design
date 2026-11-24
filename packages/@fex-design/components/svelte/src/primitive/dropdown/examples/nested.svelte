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
  let value = $state("尚未选择");
</script>

<div class="flex min-h-48 flex-col items-start gap-4 p-6">
  <DropdownRoot onActivate={(info) => (value = info.value)}>
    <DropdownTrigger
      >{#snippet children({ action, props })}
        <button use:action {...props} class={buttonClassName()}>操作</button>
      {/snippet}</DropdownTrigger
    >
    <DropdownPortal
      ><DropdownContent>
        <MenuItem value="rename">重命名</MenuItem>
        <SubMenu value="share"
          ><SubMenuTrigger>分享</SubMenuTrigger><SubMenuContent>
            <MenuItem value="link">复制链接</MenuItem>
            <SubMenu value="send"
              ><SubMenuTrigger>发送到</SubMenuTrigger><SubMenuContent>
                <MenuItem value="email">电子邮件</MenuItem>
              </SubMenuContent></SubMenu
            >
          </SubMenuContent></SubMenu
        >
      </DropdownContent></DropdownPortal
    >
  </DropdownRoot><output>最近操作：{value}</output>
</div>
