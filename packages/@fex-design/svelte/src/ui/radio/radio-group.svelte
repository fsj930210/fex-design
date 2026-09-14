<script lang="ts">
  import type { Snippet } from "svelte";
  import PrimitiveGroup from "../../primitive/radio/radio-group.svelte";
  import type { RadioValue } from "../../primitive/radio/context";
  import Radio from "./radio.svelte";
  interface Props {
    value?: RadioValue;
    defaultValue?: RadioValue;
    disabled?: boolean;
    orientation?: "horizontal" | "vertical";
    options?: readonly { label: string; value: RadioValue; disabled?: boolean }[];
    onValueChange?: (value: RadioValue, meta: unknown) => void;
    children?: Snippet;
  }
  let { options, children, ...rest }: Props = $props();
</script>
<PrimitiveGroup {...rest}>
  {#if options}
    {#each options as option (option.value)}
      <Radio value={option.value} disabled={option.disabled}>{option.label}</Radio>
    {/each}
  {:else}
    {@render children?.()}
  {/if}
</PrimitiveGroup>
