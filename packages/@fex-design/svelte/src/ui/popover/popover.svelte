<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import type {
    PopoverClassNames,
    PopoverOptions,
    PopoverSemanticPart,
  } from "@fex-design/core/popover/types";
  import { splitPopoverOptions } from "@fex-design/core/popover/options";
  import { cn } from "@fex/utils";
  import {
    Popover as PrimitivePopover,
    PopoverArrow,
    PopoverContent,
    PopoverHeader,
    PopoverPortal,
    PopoverTitle,
    PopoverTrigger,
  } from "../../primitive/popover/popover";
  import type { PopoverTriggerBinding } from "../../primitive/popover/trigger.types";

  interface PopoverProps
    extends
      PopoverOptions,
      Omit<HTMLAttributes<HTMLDivElement>, "children" | "title" | "content"> {
    children?: Snippet<[PopoverTriggerBinding]>;
    title?: string | Snippet;
    content?: string | Snippet<[{ open: boolean; close: () => void }]>;
    classNames?: PopoverClassNames;
    styles?: Partial<Record<PopoverSemanticPart, string>>;
  }
  let {
    children: triggerContent,
    title,
    content,
    class: className,
    style,
    classNames,
    styles,
    ...rest
  }: PopoverProps = $props();
  const separated = $derived(splitPopoverOptions(rest));
</script>

<PrimitivePopover {...separated[0]}>
  {#snippet children(state)}
    <PopoverTrigger>
      {#snippet children(binding)}
        {@render triggerContent?.(binding)}
      {/snippet}
    </PopoverTrigger>
    <PopoverPortal>
      <PopoverContent
        {...separated[1]}
        class={cn(className, classNames?.root)}
        style={[style, styles?.root].filter(Boolean).join(";")}
      >
        <PopoverArrow class={classNames?.arrow} style={styles?.arrow} />
        {#if title != null}
          <PopoverHeader>
            <PopoverTitle class={classNames?.title} style={styles?.title}>
              {#if typeof title === "string"}{title}{:else}{@render title()}{/if}
            </PopoverTitle>
          </PopoverHeader>
        {/if}
        <div
          data-slot="popover-body"
          class={classNames?.content}
          style={styles?.content}
        >
          {#if typeof content === "string"}{content}{:else}{@render content?.(
              state,
            )}{/if}
        </div>
      </PopoverContent>
    </PopoverPortal>
  {/snippet}
</PrimitivePopover>
