<script lang="ts">
  import {
    DropdownRoot,
    DropdownTrigger,
    DropdownPortal,
    DropdownContent,
  } from "@fex-design/svelte/primitive/dropdown";
  import {
    MenuItem,
    type MenuActivateInfo,
  } from "@fex-design/svelte/primitive/menu";
  import { buttonClassName } from "@fex-design/components-styles/button";
  let message = $state("尚未操作");
  let selected = $state<string[]>([]);
  function activate(info: MenuActivateInfo) {
    if (info.value === "cancel") {
      info.preventDefault();
      message = "激活已取消";
      return;
    }
    message = "已选择，菜单保持打开";
  }
</script>

<div class="flex min-h-48 flex-col items-start gap-4 p-6">
  <DropdownRoot
    closeOnSelect={false}
    onActivate={activate}
    menuProps={{ value: selected, onValueChange: (next) => (selected = next) }}
  >
    <DropdownTrigger
      >{#snippet children({ action, props })}
        <button use:action {...props} class={buttonClassName()}>操作</button>
      {/snippet}</DropdownTrigger
    >
    <DropdownPortal
      ><DropdownContent
        ><MenuItem value="keep">选择并保持打开</MenuItem>
        <MenuItem value="cancel">取消激活</MenuItem></DropdownContent
      ></DropdownPortal
    >
  </DropdownRoot><output>{message}；选中：{selected.join(", ") || "无"}</output>
</div>
