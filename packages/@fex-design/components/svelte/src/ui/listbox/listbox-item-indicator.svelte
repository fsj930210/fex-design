<script lang="ts">
  import { listboxItemIndicatorClassName } from "@fex-design/components-styles/listbox";
  import { cn } from "@fex-design/utils";
  import type { Snippet } from "svelte";
  import CheckIcon from '@fex-design/svelte/icons/check.svelte';
  import PrimitiveListboxItemIndicator from '@fex-design/svelte/primitive/listbox/listbox-item-indicator.svelte';

  let {
    class: className,
    children,
    ...rest
  }: { class?: string; children?: Snippet; [key: string]: unknown } = $props();
</script>

<PrimitiveListboxItemIndicator
  {...rest}
  class={cn(listboxItemIndicatorClassName, className)}
>
  {#if children}
    {@render children()}
  {:else}
    <CheckIcon />
  {/if}
</PrimitiveListboxItemIndicator>
