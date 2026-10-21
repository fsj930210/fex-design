<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { menuItemClassName } from "@fex-design/components-styles/menu";
  import { readableCoreStore } from "@fex-design/svelte/stores/core-store";
  import { cn } from "@fex-design/utils";
  import { getMenuLevel, useMenuContext } from "./context";
  interface Binding {
    props: HTMLAttributes<HTMLElement> & {
      disabled?: boolean | undefined;
      type?: "button";
    };
    action(element: HTMLElement): { destroy(): void };
    state: { disabled: boolean; selected: boolean };
  }
  interface Props extends HTMLAttributes<HTMLElement> {
    disabled?: boolean | undefined;
    value: string;
    textValue?: string | undefined;
    trigger?: Snippet<[Binding]>;
  }
  let {
    value,
    textValue,
    disabled = false,
    trigger,
    children,
    class: className,
    ...rest
  }: Props = $props();
  const dom = useMenuContext(),
    parent = getMenuLevel(),
    snapshot = readableCoreStore(dom.controller);
  const source = () => ({ value, disabled, textValue });
  function action(element: HTMLElement) {
    return { destroy: dom.bindItem(element, source, parent) };
  }
  // Consumer rune props update an existing registered DOM host.
  $effect(() => {
    source();
    dom.refresh();
  });
  const state = $derived({
    disabled: $snapshot.disabled || disabled,
    selected: $snapshot.value.includes(value),
  });
  const itemProps = $derived({
    ...rest,
    type: "button" as const,
    role: "menuitem",
    tabindex: -1,
    disabled: state.disabled,
    "data-slot": "menu-item",
    class: cn(
      menuItemClassName({
        orientation:
          !parent && $snapshot.layout === "horizontal"
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
  <button {...itemProps} use:action>{@render children?.()}</button>
{/if}
