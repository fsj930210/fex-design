<script lang="ts">
  import InputClear from "@fex-design/svelte/primitive/input/input-clear.svelte";
  import type { Snippet } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";
  import { getInputContext } from "../../primitive/input/context";

  let { children, ...props }: HTMLButtonAttributes & { children?: Snippet } = $props();
  const input = getInputContext("InputClearWhenAvailable");
</script>

{#if input.value() !== "" && !input.disabled() && !input.readOnly()}
  <InputClear {...props}>{#if children}{@render children()}{/if}</InputClear>
{/if}
