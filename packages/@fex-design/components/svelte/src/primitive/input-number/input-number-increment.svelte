<script lang="ts">
  import { inputNumberIncrementClassName } from "@fex-design/components-styles/input-number";
  import { cn } from "@fex-design/utils";
  import type { Snippet } from "svelte";
  import type { ButtonProps } from "../button/button.types";
  import Button from "../button/button.svelte";
  import PlusIcon from '@fex-design/svelte/icons/plus.svelte';
  import { getInputNumberContext } from "./context";
  let {
    class: className,
    children,
    disabled = false,
    onclick,
    onpointerdown,
    ...rest
  }: ButtonProps & { children?: Snippet } = $props();
  const n = getInputNumberContext("InputNumberIncrement");
</script>

<Button
  {...rest}
  variant="text"
  data-slot="input-number-increment"
  aria-label="Increase value"
  disabled={disabled || !n.canIncrement()}
  class={cn(inputNumberIncrementClassName, className)}
  onpointerdown={(e) => {
    onpointerdown?.(e);
    if (!e.defaultPrevented) e.preventDefault();
  }}
  onclick={(e) => {
    onclick?.(e);
    if (!e.defaultPrevented) n.increment(e);
  }}
  >{#if children}{@render children()}{:else}<PlusIcon />{/if}</Button
>
