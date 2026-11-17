<script lang="ts">
  import { dialogContentClassName } from "@fex-design/components-styles/dialog";
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

  let { class: className, children, ...rest }: DialogContentProps = $props();
  const {
    contentId,
    dialog,
    fullscreen,
    fullscreenActive,
    modal,
    snapshot,
    titleId,
  } = getContext<DialogContext>(dialogContextKey);
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
    style={`${rest.style ?? ""};${fullscreenActive.value && fullscreen.value ? `width:${typeof fullscreen.value === "object" && fullscreen.value.width !== undefined ? (typeof fullscreen.value.width === "number" ? fullscreen.value.width + "px" : fullscreen.value.width) : "100vw"};height:${typeof fullscreen.value === "object" && fullscreen.value.height !== undefined ? (typeof fullscreen.value.height === "number" ? fullscreen.value.height + "px" : fullscreen.value.height) : "100vh"}` : ""}`}
    class={cn(classList, fullscreenActive.value && "rounded-none")}
    onkeydown={(event) => {
      if (event.key === "Escape") {
        dialog.close({ reason: "escape-key", event });
      }
    }}
  >
    {@render children?.()}
  </div>
{/if}
