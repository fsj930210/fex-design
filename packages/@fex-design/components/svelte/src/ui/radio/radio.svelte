<script module lang="ts">
  let radioId = 0;
</script>

<script lang="ts">
  import {
    radioItemClassName,
    radioLabelClassName,
    type RadioStyleProps,
  } from "@fex-design/components-styles/radio";
  import { cn } from "@fex-design/utils";
  import type { Snippet } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";
  import PrimitiveRadio from '@fex-design/svelte/primitive/radio/radio.svelte';
  import type { RadioValue } from '@fex-design/svelte/primitive/radio/context';
  interface Props extends Omit<
    HTMLButtonAttributes,
    "children" | "type" | "value"
  > {
    value: RadioValue;
    size?: RadioStyleProps["size"];
    children?: Snippet;
    classNames?: { root?: string; control?: string; label?: string };
    styles?: { root?: string; control?: string; label?: string };
  }
  let {
    id = `radio-${++radioId}`,
    value,
    disabled,
    size,
    children,
    class: className,
    style,
    classNames,
    styles,
    ...rest
  }: Props = $props();
</script>

<div
  class={cn(radioItemClassName, className, classNames?.root)}
  style={[style, styles?.root].filter(Boolean).join(";")}
>
  <PrimitiveRadio
    {...rest}
    {id}
    {value}
    {disabled}
    {size}
    class={classNames?.control}
    style={styles?.control}
  />
  {#if children}
    <label
      for={id}
      class={cn(radioLabelClassName, classNames?.label)}
      style={styles?.label}
    >
      {@render children()}
    </label>
  {/if}
</div>
