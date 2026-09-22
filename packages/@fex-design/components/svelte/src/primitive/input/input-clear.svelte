<script lang="ts">
  import { inputClearClassName } from "@fex-design/components-styles/input";
  import { cn } from "@fex-design/utils";
  import type { Snippet } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";
  import CircleXIcon from '@fex-design/svelte/icons/circle-x.svelte';
  import { getInputContext } from "./context";

  interface Props extends Omit<HTMLButtonAttributes, "class"> {
    class?: string;
    children?: Snippet;
  }

  let {
    class: className,
    children,
    onclick,
    ...rest
  }: Props = $props();
  const input = getInputContext("InputClear");
</script>

<button
  type="button"
  aria-label="Clear input"
  {...rest}
  data-slot="input-clear"
  class={cn(inputClearClassName, className)}
  onclick={(event) => {
    onclick?.(event);
    if (!event.defaultPrevented) input.clear();
  }}
>
  {#if children}{@render children()}{:else}<CircleXIcon />{/if}
</button>
