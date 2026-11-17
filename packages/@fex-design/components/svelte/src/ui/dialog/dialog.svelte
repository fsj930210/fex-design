<script lang="ts">
  import type { Snippet, ComponentProps } from "svelte";
  import { Button } from "@fex-design/svelte/ui/button";
  import {
    DialogRoot,
    DialogPortal,
    DialogOverlay,
    DialogContent,
    DialogHeader,
    DialogActions,
    DialogTitle,
    DialogBody,
    DialogFooter,
    DialogClose,
    DialogFullscreenToggle,
  } from "@fex-design/svelte/primitive/dialog";

  interface Props {
    open?: boolean;
    modal?: boolean;
    defaultOpen?: boolean;
    forceMount?: boolean;
    closeDelay?: number;
    closeOnEscape?: boolean;
    title?: string | Snippet;
    header?: Snippet;
    actions?: Snippet;
    children?: Snippet;
    footer?: Snippet | null;
    closable?:
      | boolean
      | {
          icon?: Snippet | null;
          disabled?: boolean;
          onClose?: (event: MouseEvent) => void;
        };
    styles?: Partial<Record<"content", Record<string, string>>>;
    classNames?: Partial<
      Record<"content" | "header" | "title" | "body" | "footer", string>
    >;
    overlay?: boolean;
    closeOnOverlayClick?: boolean;
    fullscreen?: boolean | { mode?: "viewport" | "screen" };
    okBtnProps?: ComponentProps<typeof Button>;
    cancelBtnProps?: ComponentProps<typeof Button>;
    onOpenChange?: (open: boolean, info: unknown) => void;
  }
  let {
    modal = true,
    styles,
    classNames,
    open = $bindable(),
    defaultOpen,
    forceMount,
    closeDelay,
    closeOnEscape,
    title,
    header,
    actions,
    children,
    footer,
    closable = true,
    overlay = true,
    closeOnOverlayClick = true,
    fullscreen,
    okBtnProps,
    cancelBtnProps,
    onOpenChange,
  }: Props = $props();

  function handleOpenChange(nextOpen: boolean, info: unknown) {
    open = nextOpen;
    onOpenChange?.(nextOpen, info);
  }
</script>

<DialogRoot
  {modal}
  {forceMount}
  {closeDelay}
  {closeOnEscape}
  {open}
  {defaultOpen}
  {fullscreen}
  {closeOnOverlayClick}
  onOpenChange={handleOpenChange}
>
  <DialogPortal>
    {#if overlay}<DialogOverlay />{/if}
    <DialogContent
      class={classNames?.content}
      style={styles?.content
        ? Object.entries(styles.content)
            .map(
              ([key, value]) =>
                key.replace(/[A-Z]/g, (letter) => "-" + letter.toLowerCase()) +
                ":" +
                value,
            )
            .join(";")
        : undefined}
    >
      <DialogHeader class={classNames?.header}>
        {#if title}<DialogTitle class={classNames?.title}
            >{#if typeof title === "function"}{@render title()}{:else}{title}{/if}</DialogTitle
          >{/if}
        {#if header}{@render header()}{/if}
      </DialogHeader>
      <DialogActions>
        {#if actions}{@render actions()}{/if}
        {#if fullscreen}<DialogFullscreenToggle />{/if}
        {#if closable !== false && !(typeof closable === "object" && closable.icon === null)}
          <DialogClose
            icon={typeof closable === "object"
              ? (closable.icon ?? undefined)
              : undefined}
            disabled={typeof closable === "object"
              ? closable.disabled
              : undefined}
            onclick={typeof closable === "object"
              ? closable.onClose
              : undefined}
          />
        {/if}
      </DialogActions>
      <DialogBody class={classNames?.body}
        >{#if children}{@render children()}{/if}</DialogBody
      >
      {#if footer !== null}
        <DialogFooter class={classNames?.footer}>
          {#if footer}{@render footer()}{:else}<DialogClose
              >{#snippet button(closeProps)}<Button
                  {...closeProps}
                  {...cancelBtnProps}
                  onclick={closeProps.onclick}
                  >{#if cancelBtnProps?.children}{@render cancelBtnProps.children()}{:else}取消{/if}</Button
                >{/snippet}</DialogClose
            ><Button variant="solid" color="primary" {...okBtnProps}
              >{#if okBtnProps?.children}{@render okBtnProps.children()}{:else}确定{/if}</Button
            >{/if}
        </DialogFooter>
      {/if}
    </DialogContent>
  </DialogPortal>
</DialogRoot>
