<script lang="ts">
  import {
    checkboxCheckIconClassName,
    checkboxIndicatorClassName,
    checkboxMinusIconClassName,
  } from "@fex-design/components-styles/checkbox";
  import { cn } from "@fex-design/utils";
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import CheckIcon from '@fex-design/svelte/icons/check.svelte';
  import MinusIcon from '@fex-design/svelte/icons/minus.svelte';
  interface Props extends HTMLAttributes<HTMLSpanElement> {
    children?: Snippet;
  }
  let { class: className, children, ...rest }: Props = $props();
</script>

<span
  {...rest}
  aria-hidden="true"
  data-slot="checkbox-indicator"
  class={cn(checkboxIndicatorClassName, className)}
  >{#if children}{@render children()}{:else}<CheckIcon
      data-slot="checkbox-check"
      class={checkboxCheckIconClassName}
    /><MinusIcon
      data-slot="checkbox-minus"
      class={checkboxMinusIconClassName}
    />{/if}</span
>
