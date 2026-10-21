<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import ChevronRightIcon from "@fex-design/svelte/icons/chevron-right";
  import {
    menuItemClassName,
    menuExpandIconClassName,
  } from "@fex-design/components-styles/menu";
  import { readableCoreStore } from "@fex-design/svelte/stores/core-store";
  import { cn } from "@fex-design/utils";
  import { getSubMenu, useMenuContext } from "./context";
  interface Binding {
    props: HTMLAttributes<HTMLElement> & {
      disabled?: boolean | undefined;
      type?: "button";
    };
    action(element: HTMLElement): { destroy(): void };
    state: { disabled: boolean; open: boolean };
  }
  interface Props extends HTMLAttributes<HTMLElement> {
    disabled?: boolean | undefined;
    textValue?: string | undefined;
    indicator?: Snippet;
    trigger?: Snippet<[Binding]>;
  }
  let {
    textValue,
    disabled = false,
    trigger,
    children,
    indicator,
    class: className,
    ...rest
  }: Props = $props();
  const dom = useMenuContext(),
    branch = getSubMenu(),
    snapshot = readableCoreStore(dom.controller);
  const source = () => ({ value: branch.value(), disabled, textValue });
  function action(element: HTMLElement) {
    return { destroy: dom.bindItem(element, source, branch.parent, branch) };
  }
  // Consumer rune props update an existing registered DOM host.
  $effect(() => {
    source();
    dom.refresh();
  });
  const state = $derived({
    disabled: $snapshot.disabled || disabled,
    open:
      !$snapshot.disabled &&
      !disabled &&
      $snapshot.openValues.includes(branch.value()),
  });
  const itemProps = $derived({
    ...rest,
    type: "button" as const,
    role: "menuitem",
    tabindex: -1,
    disabled: state.disabled,
    "data-slot": "submenu-trigger",
    "aria-haspopup": "menu" as const,
    "aria-expanded": state.open,
    class: cn(
      menuItemClassName({
        orientation:
          !branch.parent && $snapshot.layout === "horizontal"
            ? "horizontal"
            : "vertical",
      }),
      className,
    ),
  } satisfies HTMLAttributes<HTMLElement> & {
    disabled?: boolean | undefined;
    type?: "button";
  });
</script>

{#if trigger}
  {@render trigger({ props: itemProps, action, state })}
{:else}
  <button {...itemProps} use:action
    >{@render children?.()}<span class={menuExpandIconClassName}
      >{#if indicator}{@render indicator()}{:else}<ChevronRightIcon
        />{/if}</span
    ></button
  >
{/if}
