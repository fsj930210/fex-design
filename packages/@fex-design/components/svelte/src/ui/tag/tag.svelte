<script lang="ts">
  import type {
    TagClassNames,
    TagOptions,
    TagStyles,
  } from "@fex-design/core/tag/types";
  import { cn } from "@fex-design/utils";
  import type { ComponentProps, Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import PrimitiveTag from "@fex-design/svelte/primitive/tag/tag.svelte";
  import TagAction from "@fex-design/svelte/primitive/tag/tag-action.svelte";

  interface Props
    extends Omit<HTMLAttributes<HTMLSpanElement>, "color">, TagOptions {
    children?: Snippet;
    actionProps?:
      | Omit<
          ComponentProps<typeof TagAction>,
          "children" | "disabled" | "onclick"
        >
      | undefined;
    closable?: boolean;
    closeIcon?: Snippet;
    onClose?: (event: MouseEvent) => void;
    classNames?: TagClassNames;
    styles?: TagStyles<string>;
  }

  let {
    actionProps,
    children,
    closable = false,
    closeIcon,
    onClose,
    disabled = false,
    class: className,
    style,
    classNames,
    styles,
    ...rest
  }: Props = $props();
</script>

<PrimitiveTag
  {...rest}
  {disabled}
  class={cn(className, classNames?.root)}
  style={[style, styles?.root].filter(Boolean).join(";")}
>
  {@render children?.()}
  {#if closable && closeIcon}
    <TagAction
      {...actionProps}
      {disabled}
      aria-label={actionProps?.["aria-label"] ?? "Close"}
      class={cn(classNames?.close, actionProps?.class)}
      style={[styles?.close, actionProps?.style].filter(Boolean).join(";")}
      onclick={onClose}
    >
      {@render closeIcon()}
    </TagAction>
  {:else if closable}
    <TagAction
      {...actionProps}
      {disabled}
      aria-label={actionProps?.["aria-label"] ?? "Close"}
      class={cn(classNames?.close, actionProps?.class)}
      style={[styles?.close, actionProps?.style].filter(Boolean).join(";")}
      onclick={onClose}
    />
  {/if}
</PrimitiveTag>
