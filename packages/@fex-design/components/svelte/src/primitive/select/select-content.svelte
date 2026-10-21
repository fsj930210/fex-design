<script lang="ts">
  import { selectContentClassName } from "@fex-design/components-styles/select";
  import { cn } from "@fex-design/utils";
  import { getContext, type ComponentProps, type Snippet } from "svelte";
  import { selectContextKey, type SelectContext } from "./context";
  import PopoverContent from "../popover/popover-content.svelte";
  import PopoverPortal from "../popover/popover-portal.svelte";
  import SelectList from "./select-list.svelte";
  let {
    popoverContentProps,
    portalProps,
    listProps,
    style,
    class: className,
    children,
    option,
    emptyText,
    loadingText,
    footer,
    popupRender,
  }: {
    popoverContentProps?:
      Omit<ComponentProps<typeof PopoverContent>, "children"> | undefined;
    portalProps?:
      Omit<ComponentProps<typeof PopoverPortal>, "children"> | undefined;
    listProps?: Omit<ComponentProps<typeof SelectList>, "children"> | undefined;
    style?: string | undefined;
    class?: string | undefined;
    children?: Snippet | undefined;
    option?: Snippet<
      [
        import("@fex-design/core/select/types").SelectOption,
        { selected: boolean; active: boolean; disabled: boolean },
      ]
    >;
    emptyText?: string;
    loadingText?: string;
    footer?: Snippet;
    popupRender?: Snippet<[Snippet, { close: () => void }]>;
  } = $props();
  const select = getContext<SelectContext>(selectContextKey);
  const close = () => select.controller.close();
</script>

{#snippet menu()}
  {#if children}{@render children()}{:else}<SelectList
      {...listProps}
      option={option ?? listProps?.option}
      emptyText={emptyText ?? listProps?.emptyText}
      loadingText={loadingText ?? listProps?.loadingText}
    />{/if}
{/snippet}

<PopoverPortal {...portalProps}
  ><PopoverContent
    {...popoverContentProps}
    class={cn(selectContentClassName, className, popoverContentProps?.class)}
    style={[
      "max-width: var(--floating-available-width);",
      style,
      popoverContentProps?.style,
    ]
      .filter(Boolean)
      .join(";")}
    >{#if popupRender}{@render popupRender(menu, {
        close,
      })}{:else}{@render menu()}{/if}{@render footer?.()}</PopoverContent
  ></PopoverPortal
>
