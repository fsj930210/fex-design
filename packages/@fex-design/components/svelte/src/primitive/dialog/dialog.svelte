<script lang="ts">
  import {
    createDialogController,
    type DialogOptions,
  } from "@fex-design/core/dialog/create-dialog-controller";
  import type { Snippet } from "svelte";
  import { onDestroy, setContext } from "svelte";
  import { readableCoreStore } from "@fex-design/svelte/stores/core-store";
  import { dialogContextKey } from "./dialog-context";

  interface DialogProps extends DialogOptions {
    children?: Snippet;
  }

  let {
    children,
    open = $bindable(),
    defaultOpen,
    modal = true,
    forceMount,
    closeDelay = 200,
    closeOnEscape = true,
    closeOnOverlayClick = true,
    fullscreen = false,
    onFullscreenChange,
    onOpenChange,
  }: DialogProps = $props();

  // svelte-ignore state_referenced_locally -- defaultOpen is intentionally read once for uncontrolled initial state.
  let localOpen = $state(defaultOpen ?? false);
  let fullscreenActive = $state({ value: false });
  let fullscreenState = $state({ value: fullscreen });
  const triggerElement = { current: null as HTMLButtonElement | null };
  const dialogId = Math.random().toString(36).slice(2);

  function createOptions(): DialogOptions {
    return {
      open: open ?? localOpen,
      modal,
      forceMount,
      closeDelay,
      closeOnEscape,
      closeOnOverlayClick,
      fullscreen,
      onFullscreenChange,
      onOpenChange(nextOpen, info) {
        if (!nextOpen) fullscreenActive.value = false;
        if (open === undefined) {
          localOpen = nextOpen;
        } else {
          open = nextOpen;
        }
        onOpenChange?.(nextOpen, info);
      },
    };
  }

  const dialog = createDialogController(createOptions());
  const snapshot = readableCoreStore(dialog);

  $effect(() => {
    dialog.setOptions(createOptions());
  });
  $effect(() => {
    fullscreenState.value = fullscreen;
  });

  setContext(dialogContextKey, {
    contentId: `dialog-content-${dialogId}`,
    dialog,
    modal,
    fullscreen: fullscreenState,
    fullscreenActive,
    onFullscreenChange,
    snapshot,
    titleId: `dialog-title-${dialogId}`,
    triggerElement,
  });

  onDestroy(() => dialog.destroy());
</script>

{@render children?.()}
