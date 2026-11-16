<script lang="ts">
  import { dialogCloseClassName, dialogIconCloseClassName } from "@fex-design/components-styles/dialog";
  import { cn } from "@fex-design/utils";
  import { getContext } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";
  import { dialogContextKey, type DialogContext } from "./dialog-context";
  import Button from "../button/button.svelte";
  import XIcon from "../../icons/x.svelte";
  interface DialogCloseRenderProps extends HTMLButtonAttributes {
    "data-slot": "dialog-close";
  }

  interface DialogCloseProps extends Omit<HTMLButtonAttributes, "children"> {
    button?: Snippet<[DialogCloseRenderProps]>;
    children?: Snippet;
  }
  let {
    button,
    children,
    class: className,
    type = "button",
    ...rest
  }: DialogCloseProps = $props();
  const { dialog } = getContext<DialogContext>(dialogContextKey);
  const closeProps = $derived({
    ...rest,
    type,
    "data-slot": "dialog-close",
    class: cn(children ? dialogCloseClassName : dialogIconCloseClassName, className),
    onclick: (event: MouseEvent) =>
      dialog.close({ reason: "manual", source: "close-button", event }),
  } satisfies DialogCloseRenderProps);
</script>

{#if button}
  {@render button(closeProps)}
{:else}
  <Button {...closeProps}>{#if children}{@render children()}{:else}<XIcon aria-hidden="true" />{/if}</Button>
{/if}

