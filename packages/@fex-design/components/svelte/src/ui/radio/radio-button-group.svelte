<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "@fex-design/utils";
  import PrimitiveButton from '@fex-design/svelte/primitive/radio/radio-button.svelte';
  import PrimitiveGroup from '@fex-design/svelte/primitive/radio/radio-group.svelte';
  import type { RadioValue } from '@fex-design/svelte/primitive/radio/context';
  interface Props {
    value?: RadioValue;
    defaultValue?: RadioValue;
    disabled?: boolean;
    orientation?: "horizontal" | "vertical";
    options?: readonly {
      label: string;
      value: RadioValue;
      disabled?: boolean;
    }[];
    onValueChange?: (value: RadioValue, meta: unknown) => void;
    children?: Snippet;
    class?: string;
  }
  let {
    options,
    children,
    orientation = "horizontal",
    class: className,
    ...rest
  }: Props = $props();
</script>

<PrimitiveGroup {...rest} {orientation} class={cn("gap-0", className)}>
  {#if options}
    {#each options as option (option.value)}
      <PrimitiveButton value={option.value} disabled={option.disabled}>
        {option.label}
      </PrimitiveButton>
    {/each}
  {:else}
    {@render children?.()}
  {/if}
</PrimitiveGroup>
