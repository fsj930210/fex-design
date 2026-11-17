<script lang="ts">
  import { getContext } from "svelte";
  import { dialogIconCloseClassName } from "@fex-design/components-styles/dialog";
  import { cn } from "@fex-design/utils";
  import { dialogContextKey, type DialogContext } from "./dialog-context";
  import ExpandIcon from "../../icons/expand.svelte";
  import ShrinkIcon from "../../icons/shrink.svelte";
  import Button from "../button/button.svelte";
  let {
    class: className,
    icon,
    children,
  }: {
    class?: string;
    icon?: import("svelte").Snippet;
    children?: import("svelte").Snippet;
  } = $props();
  const context = getContext<DialogContext>(dialogContextKey);
  const setting = $derived(context.fullscreen.value);
  $effect(() => {
    if (setting !== true && setting?.mode !== "screen") return;
    const onChange = () =>
      context.onFullscreenChange?.(document.fullscreenElement !== null);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  });
  async function toggle() {
    if (!setting) return;
    const mode = setting === true ? "viewport" : setting.mode;
    if (mode === "screen") {
      const element = document.getElementById(context.contentId);
      if (element && document.fullscreenElement !== element) {
        try {
          await element.requestFullscreen();
        } catch {
          context.fullscreenActive.value = true;
          context.onFullscreenChange?.(true);
          return;
        }
      } else if (document.fullscreenElement) await document.exitFullscreen();
    }
    const next =
      mode === "screen"
        ? document.fullscreenElement !== null
        : !context.fullscreenActive.value;
    context.fullscreenActive.value = next;
    context.onFullscreenChange?.(next);
  }
</script>

{#if setting}<Button
    type="button"
    data-slot="dialog-fullscreen-toggle"
    aria-label="Toggle fullscreen"
    class={cn(dialogIconCloseClassName, className)}
    onclick={toggle}
    >{#if children}{@render children()}{:else if icon}{@render icon()}{:else if context.fullscreenActive.value}<ShrinkIcon
        aria-hidden="true"
      />{:else}<ExpandIcon aria-hidden="true" />{/if}</Button
  >{/if}
