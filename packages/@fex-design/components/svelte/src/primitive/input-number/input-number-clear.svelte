<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";
  import InputClear from "../input/input-clear.svelte";
  import { getInputNumberContext } from "./context";
  let {
    children,
    onclick,
    ...rest
  }: HTMLButtonAttributes & { children?: Snippet } = $props();
  const n = getInputNumberContext("InputNumberClear");
  const clear = (event: MouseEvent) => {
    onclick?.(event);
    if (event.defaultPrevented) return;
    event.preventDefault();
    n.clear(event);
  };
</script>

{#if children}
  <InputClear
    {...rest}
    data-slot="input-number-clear"
    onclick={clear}
  >
    {@render children()}
  </InputClear>
{:else}
  <InputClear
    {...rest}
    data-slot="input-number-clear"
    onclick={clear}
  />
{/if}
