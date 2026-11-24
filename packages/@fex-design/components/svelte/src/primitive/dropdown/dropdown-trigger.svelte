<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";
  import type { PopoverContext } from "../popover/popover-context";
  import PopoverTrigger from "../popover/popover-trigger.svelte";
  import { getDropdownContext } from "./context";

  type Binding = {
    action: (element: HTMLElement) => { destroy: () => void };
    props: HTMLButtonAttributes & { "data-dropdown-trigger"?: string };
    state: ReturnType<PopoverContext["overlay"]["getSnapshot"]>;
  };
  let {
    children,
    onkeydown,
    ...rest
  }: Omit<HTMLButtonAttributes, "children" | "id"> & {
    children: Snippet<[Binding]>;
  } = $props();
  const context = getDropdownContext();
  function keydown(
    event: KeyboardEvent & { currentTarget: HTMLButtonElement },
  ) {
    onkeydown?.(event);
    if (!event.defaultPrevented) context.controller.triggerKeyDown(event);
  }
</script>

<PopoverTrigger {...rest}>
  {#snippet children(slot)}
    {@render children({
      ...slot,
      props: {
        ...slot.props,
        id: context.triggerId,
        "data-dropdown-trigger": "",
        "aria-haspopup": "menu",
        "aria-disabled": context.disabled || slot.props["aria-disabled"],
        onkeydown: keydown,
      },
    })}
  {/snippet}
</PopoverTrigger>
