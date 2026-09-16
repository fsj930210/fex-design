<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import type {
    TooltipClassNames,
    Tooltip,
    TooltipOptions,
    TooltipSemanticPart,
  } from "@fex-design/core/tooltip/create-tooltip";
  import { cn } from "@fex/utils";
  import { splitTooltipOptions } from "@fex-design/core/tooltip/options";
  import TooltipRoot from "../../primitive/tooltip/tooltip.svelte";
  import TooltipArrow from "../../primitive/tooltip/tooltip-arrow.svelte";
  import TooltipContent from "../../primitive/tooltip/tooltip-content.svelte";
  import TooltipPortal from "../../primitive/tooltip/tooltip-portal.svelte";
  import TooltipTrigger from "../../primitive/tooltip/tooltip-trigger.svelte";

  type TooltipTriggerBinding = {
    action: (element: HTMLElement) => { destroy: () => void };
    props: HTMLAttributes<HTMLElement>;
    state: ReturnType<Tooltip["getSnapshot"]>;
  };
  interface TooltipProps
    extends
      TooltipOptions,
      Omit<HTMLAttributes<HTMLDivElement>, "children" | "title" | "color"> {
    children?: Snippet<[TooltipTriggerBinding]>;
    title?: string | Snippet;
    color?: string;
    arrow?: boolean;
    classNames?: TooltipClassNames;
    styles?: Partial<Record<TooltipSemanticPart, string>>;
  }
  let {
    children,
    title,
    color,
    arrow = true,
    class: className,
    style,
    classNames,
    styles,
    ...rest
  }: TooltipProps = $props();
  const separated = $derived(splitTooltipOptions(rest));
  const rootStyle = $derived([style, styles?.root].filter(Boolean).join(";"));
</script>

<TooltipRoot {...separated[0]}>
  <TooltipTrigger>
    {#snippet children(binding)}{@render children?.(binding)}{/snippet}
  </TooltipTrigger>
  <TooltipPortal>
    <TooltipContent
      {...separated[1]}
      {color}
      class={cn(className, classNames?.root)}
      style={rootStyle}
    >
      {#if typeof title === "string"}{title}{:else}{@render title?.()}{/if}
      {#if arrow}<TooltipArrow
          class={classNames?.arrow}
          style={styles?.arrow}
        />{/if}
    </TooltipContent>
  </TooltipPortal>
</TooltipRoot>
