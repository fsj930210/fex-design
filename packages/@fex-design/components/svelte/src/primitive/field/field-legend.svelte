<script lang="ts">
  import { fieldLegendClassName } from "@fex-design/components-styles/field";
  import { cn } from "@fex-design/utils";
  import type { HTMLAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";
  let {
    class: className,
    children,
    ...rest
  }: HTMLAttributes<HTMLLegendElement> & { children?: Snippet } = $props();
</script>

<legend
  {...rest}
  data-slot="field-legend"
  class={cn(fieldLegendClassName, className)}>{@render children?.()}</legend
>
