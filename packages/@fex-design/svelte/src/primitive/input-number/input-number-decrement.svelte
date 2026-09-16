<script lang="ts">
  import { inputNumberDecrementClassName } from "@fex-design/styles/input-number";
  import { cn } from "@fex/utils";
  import type { Snippet } from "svelte";
  import type { ButtonProps } from "../button/button.types";
  import Button from "../button/button.svelte";
  import MinusIcon from "../../icon/minus.svelte";
  import { getInputNumberContext } from "./context";
  let {
    class: className,
    children,
    disabled = false,
    onclick,
    onpointerdown,
    ...rest
  }: ButtonProps & { children?: Snippet } = $props();
  const n = getInputNumberContext("InputNumberDecrement");
</script>

<Button
  {...rest}
  variant="text"
  data-slot="input-number-decrement"
  aria-label="Decrease value"
  disabled={disabled || !n.canDecrement()}
  class={cn(inputNumberDecrementClassName, className)}
  onpointerdown={(e) => {
    onpointerdown?.(e);
    if (!e.defaultPrevented) e.preventDefault();
  }}
  onclick={(e) => {
    onclick?.(e);
    if (!e.defaultPrevented) n.decrement(e);
  }}
  >{#if children}{@render children()}{:else}<MinusIcon />{/if}</Button
>
