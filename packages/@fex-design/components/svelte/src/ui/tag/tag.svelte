<script lang="ts">
  import type {
    TagClassNames,
    TagOptions,
    TagStyles,
  } from "@fex-design/core/tag/types";
  import { cn } from "@fex-design/utils";
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import PrimitiveTag from '@fex-design/svelte/primitive/tag/tag.svelte';
  import TagAction from '@fex-design/svelte/primitive/tag/tag-action.svelte';

  interface Props
    extends Omit<HTMLAttributes<HTMLSpanElement>, "color">, TagOptions {
    children?: Snippet;
    closable?: boolean;
    closeIcon?: Snippet;
    onClose?: (event: MouseEvent) => void;
    classNames?: TagClassNames;
    styles?: TagStyles<string>;
  }

  let {
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
  style={`${typeof style === "string" ? style : ""}${styles?.root ?? ""}`}
>
  {@render children?.()}
  {#if closable && closeIcon}
    <TagAction
      {disabled}
      aria-label="Close"
      class={classNames?.close}
      style={styles?.close}
      onclick={onClose}
    >
      {@render closeIcon()}
    </TagAction>
  {:else if closable}
    <TagAction
      {disabled}
      aria-label="Close"
      class={classNames?.close}
      style={styles?.close}
      onclick={onClose}
    />
  {/if}
</PrimitiveTag>
