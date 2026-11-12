<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { formLegendClassName } from "@fex-design/components-styles/form";
  import { cn } from "@fex-design/utils";
  import { getRoot } from "./context";
  let {
    ref = $bindable<HTMLLegendElement | null>(null),
    children,
    class: className,
    ...rest
  }: HTMLAttributes<HTMLLegendElement> & {
    children?: Snippet;
    ref?: HTMLLegendElement | null;
  } = $props();
  getRoot();
</script>

<legend
  bind:this={ref}
  {...rest}
  data-slot="form-legend"
  class={cn(formLegendClassName, className)}
>
  {@render children?.()}
</legend>
