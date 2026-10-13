<script lang="ts">
  import { selectContentClassName } from "@fex-design/components-styles/select";
  import { cn } from "@fex-design/utils";
  import { getContext, type Snippet } from "svelte";
  import { selectContextKey, type SelectContext } from "./context";
  import PopoverContent from "../popover/popover-content.svelte";
  import PopoverPortal from "../popover/popover-portal.svelte";
  import SelectList from "./select-list.svelte";
  let {
    class: className,
    children,
    option,
    emptyText,
    loadingText,
    footer,
    popupRender,
  }: {
    class?: string | undefined;
    children?: Snippet | undefined;
    option?: Snippet<[import('@fex-design/core/select/types').SelectOption, { selected: boolean; active: boolean; disabled: boolean }]>;
    emptyText?: string;
    loadingText?: string;
    footer?: Snippet;
    popupRender?: Snippet<[Snippet, { close: () => void }]>;
  } = $props();
  const select = getContext<SelectContext>(selectContextKey);
  const close = () => select.controller.close();
</script>

{#snippet menu()}
  {#if children}{@render children()}{:else}<SelectList {option} {emptyText} {loadingText} />{/if}
{/snippet}

<PopoverPortal
  ><PopoverContent
    class={cn(selectContentClassName, className)}
    style="max-width: var(--floating-available-width);"
    >{#if popupRender}{@render popupRender(menu, { close })}{:else}{@render menu()}{/if}{@render footer?.()}</PopoverContent
  ></PopoverPortal
>
