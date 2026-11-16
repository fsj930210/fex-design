<script lang="ts">
  import {
    dialogContentClassName,
  } from "@fex-design/components-styles/dialog";
  import { cn } from "@fex-design/utils";
  import { getContext } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";
  import { dialogContextKey, type DialogContext } from "./dialog-context";

  interface DialogContentProps extends Omit<
    HTMLAttributes<HTMLDivElement>,
    "class"
  > {
    children?: Snippet;
    class?: string;
  }

  let {
    class: className,
    children,
    ...rest
  }: DialogContentProps = $props();
  const { contentId, dialog, fullscreen, fullscreenActive, modal, snapshot, titleId } =
    getContext<DialogContext>(dialogContextKey);
  const classList = $derived(cn(dialogContentClassName, className));
  let registeredElement: HTMLDivElement | null = null;

  function contentAction(element: HTMLDivElement) {
    let active = true;
    queueMicrotask(() => {
      if (!active) return;
      registeredElement = element;
      dialog.setLayerElement(element);
    });
    return {
      destroy() {
        active = false;
        if (registeredElement !== element) return;
        registeredElement = null;
        queueMicrotask(() => dialog.setLayerElement(null));
      },
    };
  }
</script>

{#if $snapshot.mounted}
  <div
    {...rest}
    use:contentAction
    id={contentId}
    role="dialog"
    aria-modal={modal ? "true" : undefined}
    aria-labelledby={titleId}
    tabindex="-1"
    data-slot="dialog-content"
    data-state={$snapshot.open ? "open" : "closed"}
    data-phase={$snapshot.phase}
    style={fullscreenActive.value && fullscreen ? `width:${typeof fullscreen === 'object' && fullscreen.width !== undefined ? typeof fullscreen.width === 'number' ? fullscreen.width + 'px' : fullscreen.width : '100vw'};height:${typeof fullscreen === 'object' && fullscreen.height !== undefined ? typeof fullscreen.height === 'number' ? fullscreen.height + 'px' : fullscreen.height : '100vh'}` : undefined}
    class={cn(classList, fullscreenActive.value && "left-0 top-0 translate-x-0 translate-y-0 rounded-none")}
    onkeydown={(event) => {
      if (event.key === "Escape") {
        dialog.dismiss.escapeKey({
          target: event.target,
          currentTarget: event.currentTarget,
          event,
        });
      }
    }}
  >
    {@render children?.()}
  </div>
{/if}





