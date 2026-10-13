<script lang="ts">
  import { popoverArrowClassName } from "@fex-design/components-styles/popover";
  import { cn } from "@fex-design/utils";
  import type { HTMLAttributes } from "svelte/elements";
  import { getContext } from "svelte";
  import { popoverContextKey, type PopoverContext } from "./popover-context";

  interface PopoverArrowProps extends Omit<
    HTMLAttributes<HTMLDivElement>,
    "class"
  > {
    class?: string;
  }

  let { class: className, style, ...rest }: PopoverArrowProps = $props();
  const { arrowElement, overlay, snapshot } =
    getContext<PopoverContext>(popoverContextKey);

  function arrowAction(element: HTMLDivElement) {
    arrowElement.current = element;
    overlay.setArrowElement(element);
    return {
      destroy() {
        if (arrowElement.current === element) {
          arrowElement.current = null;
        }
        overlay.setArrowElement(null);
      },
    };
  }
</script>

{#if $snapshot.arrow}
  <div
    {...rest}
    use:arrowAction
    data-slot="popover-arrow"
    data-side={$snapshot.side}
    class={cn(popoverArrowClassName, className)}
    style={[
      $snapshot.side === "left" || $snapshot.side === "right"
        ? "top: var(--floating-arrow-y, 0px)"
        : "left: var(--floating-arrow-x, 0px)",
      style,
    ]
      .filter(Boolean)
      .join(";")}
  ></div>
{/if}
