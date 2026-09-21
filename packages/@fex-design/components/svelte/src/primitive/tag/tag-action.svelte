<script lang="ts">
  import { tagActionClassName } from "@fex-design/components-styles/tag";
  import { cn } from "@fex-design/utils";
  import type { Snippet } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";
  import XIcon from '@fex-design/svelte/icons/x.svelte';

  interface Props extends HTMLButtonAttributes {
    children?: Snippet;
  }

  let {
    class: className,
    type = "button",
    "aria-label": ariaLabel,
    children,
    ...rest
  }: Props = $props();
</script>

<button
  {...rest}
  {type}
  aria-label={ariaLabel}
  data-slot="tag-action"
  class={cn(tagActionClassName, className)}
>
  {#if children}
    {@render children()}
  {:else}
    <XIcon aria-hidden="true" />
  {/if}
</button>
