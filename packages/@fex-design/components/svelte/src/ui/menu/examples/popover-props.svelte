<script lang="ts">
  import {
    Menu,
    MenuItem,
    SubMenu,
    SubMenuTrigger,
    SubMenuContent,
  } from "@fex-design/svelte/ui/menu";
  import type { MenuPopoverProps } from "@fex-design/svelte/ui/menu";
  const popoverProps: MenuPopoverProps = {
    align: "end",
    sideOffset: 12,
    collisionPadding: 16,
    lazyMount: true,
    destroyOnHidden: true,
    zIndex: 80,
    getPopupContainer: (reference) =>
      reference?.ownerDocument.body ?? document.body,
  };
</script>

<div class="w-full max-w-xl">
  <Menu class="w-44 max-w-full"
    ><SubMenu value="actions" {popoverProps}
      ><SubMenuTrigger>Actions</SubMenuTrigger><SubMenuContent class="min-w-60"
        ><div class="px-3 py-2 text-xs">Custom popup header</div>
        <MenuItem value="copy">Copy</MenuItem><MenuItem value="archive"
          >Archive</MenuItem
        ></SubMenuContent
      ></SubMenu
    ></Menu
  >
</div>
