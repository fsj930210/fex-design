<script lang="ts">
  import { setContext, type Snippet } from "svelte";
  import type { DropdownRootOptions } from "@fex-design/core/dropdown/types";
  import { popoverContextKey } from "../popover/popover-context";
  import { menuKey, menuLevelKey, subMenuKey } from "../menu/context";
  import { dropdownKey } from "./context";
  import { createDropdown } from "./create-dropdown.svelte";

  let {
    children,
    open,
    defaultOpen,
    onOpenChange,
    onActivate,
    disabled,
    menuProps,
    popoverProps,
    closeOnSelect,
  }: DropdownRootOptions & { children?: Snippet } = $props();
  const generatedId = $props.id();
  const { controller, popover } = createDropdown(() => ({
    popoverProps: {
      ...popoverProps,
      open,
      defaultOpen,
      onOpenChange,
      disabled,
    },
    menuProps: { ...menuProps, onActivate, disabled },
    closeOnSelect,
  }));
  setContext(dropdownKey, {
    controller,
    triggerId: generatedId,
    get disabled() {
      return Boolean(disabled);
    },
  });
  setContext(popoverContextKey, popover);
  setContext(menuKey, controller.dom);
  setContext(menuLevelKey, undefined);
  setContext(subMenuKey, undefined);
</script>

{@render children?.()}
