<script lang="ts">
  import {
    DropdownRoot,
    DropdownTrigger,
    DropdownPortal,
    DropdownContent,
  } from "@fex-design/svelte/primitive/dropdown";
  import { MenuItem } from "@fex-design/svelte/primitive/menu";
  import { buttonClassName } from "@fex-design/components-styles/button";
  let container = $state<HTMLDivElement | null>(null);
</script>

<div class="grid gap-3 p-6">
  <p>浮层挂载到虚线区域，定位仍以触发器为参照。</p>
  <div
    bind:this={container}
    class="relative min-h-48 rounded-lg border-2 border-dashed p-6"
  >
    <DropdownRoot
      ><DropdownTrigger
        >{#snippet children({ action, props })}
          <button use:action {...props} class={buttonClassName()}>操作</button>
        {/snippet}</DropdownTrigger
      ><DropdownPortal {container}
        ><DropdownContent>
          <MenuItem value="rename">重命名</MenuItem><MenuItem value="duplicate"
            >复制</MenuItem
          >
        </DropdownContent></DropdownPortal
      ></DropdownRoot
    >
  </div>
</div>
